import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
  AllowedMethods,
  Distribution,
  OriginAccessIdentity,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  ARecord,
  HostedZone,
  RecordTarget,
} from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import {
  CfnOutput,
  DockerImage,
  Duration,
  RemovalPolicy,
  Stack,
} from "aws-cdk-lib";
import { execSync, ExecSyncOptions } from "child_process";
import { copySync } from "fs-extra";
import { join } from "path";
import { Construct } from "constructs";
import { CanonicalUserPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";

export interface PortFolioSiteProps {
  domainName: string;
}

/*
 * Static site infrastructure, which deploys site content to an S3 bucket.
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class PortFolioSite extends Construct {
  constructor(parent: Stack, name: string, props: PortFolioSiteProps) {
    super(parent, name);
    const { domainName } = props;
    const zone = HostedZone.fromLookup(this, "Zone", { domainName });
    const cloudfrontOAI = new OriginAccessIdentity(this, "cloudfront-OAI", {
      comment: `OAI for ${name}`,
    });

    new CfnOutput(this, "Site", { value: "https://" + domainName });

    // Content bucket
    const siteBucket = new Bucket(this, "SiteBucket", {
      bucketName: domainName,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Grant access to cloudfront
    siteBucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [siteBucket.arnForObjects("*")],
        principals: [
          new CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );
    new CfnOutput(this, "Bucket", { value: siteBucket.bucketName });

    // TLS certificate
    const certificate = new Certificate(this, "SiteCertificate", {
      domainName,
      validation: CertificateValidation.fromDns(zone),
    });

    new CfnOutput(this, "Certificate", { value: certificate.certificateArn });

    // CloudFront distribution that provides HTTPS
    const distribution = new Distribution(this, "SiteDistribution", {
      certificate: certificate,
      defaultRootObject: "index.html",
      domainNames: [domainName],
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
          ttl: Duration.minutes(30),
        },
      ],
      defaultBehavior: {
        origin: new S3Origin(siteBucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        compress: true,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    // Route53 alias record for the CloudFront distribution
    new ARecord(this, "SiteAliasRecord", {
      recordName: domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone,
    });

    new CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });

    const execOptions: ExecSyncOptions = {
      stdio: ["ignore", process.stderr, "inherit"],
    };

    const bundle = Source.asset(join(__dirname, "../apps/portfolio-ui"), {
      bundling: {
        command: [
          "sh",
          "-c",
          'echo "Docker build not supported. Please install esbuild."',
        ],
        image: DockerImage.fromRegistry("alpine"),
        local: {
          tryBundle(outputDir: string) {
            try {
              execSync("./node_modules/.bin/esbuild --version", execOptions);
            } catch (err) {
              /* istanbul ignore next */
              console.log(err);
              return false;
            }
            execSync("npm run build:web", execOptions);
            copySync(join(__dirname, "../../web"), outputDir, {
              ...execOptions,
              recursive: true,
            });
            return true;
          },
        },
      },
    });

    // Deploy site contents to S3 bucket
    new BucketDeployment(this, "DeployWithInvalidation", {
      sources: [bundle],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
