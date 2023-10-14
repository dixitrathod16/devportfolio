import {
  Stack,
  CfnOutput,
} from "aws-cdk-lib";
import {
  Cors,
  EndpointType,
  LambdaIntegration,
  LambdaRestApi,
  SecurityPolicy,
} from "aws-cdk-lib/aws-apigateway";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { HostedZone, ARecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import { ApiGateway } from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";

export interface PortFolioApiProps {
  domainName: string;
  serviceSubDomain: string;
  mediumUserName: string;
  devToUserName: string;
  userName: string,
  token: string,
}

export class PortFolioApi extends Construct {
  constructor(parent: Stack, name: string, props: PortFolioApiProps) {
    super(parent, name);

    // create nodejs function props
    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        minify: true,
        sourceMap: true,
        tsconfig: `${__dirname}/../../tsconfig.json`,
      },
      runtime: Runtime.NODEJS_18_X,
      tracing: Tracing.ACTIVE,
      logRetention: 1,
    };

    const portfolioServiceLambda = new NodejsFunction(this, 'portfolioServiceFunction', {
        functionName: 'portfolioServiceFunction',
        entry:  `${__dirname}/../../apps/portfolio-serverless-backend/portfolioService.ts`,
        handler: 'index.handler',
        ...nodeJsFunctionProps,
        environment: {
            MEDIUM_USERNAME: props.mediumUserName,
            DEV_TO_USERNAME: props.devToUserName,
            GITHUB_USERNAME: props.userName,
            GITHUB_TOKEN: props.token,
            DOMAIN_NAME: props.domainName,
        }
    });

    const domainName = `${props.serviceSubDomain}.${props.domainName}`;
    const zone = HostedZone.fromLookup(this, 'Zone', { domainName: props.domainName });

    const certificate = new Certificate(this, `ServiceCertificate`, {
        domainName,
        validation: CertificateValidation.fromDns(zone),
    });

    // create an apigateway restapi
    const api = new LambdaRestApi(this, `portfolioApi`, {
        restApiName: `portfolioApi`,
        handler: portfolioServiceLambda,
        deployOptions: {
          dataTraceEnabled: true,
          tracingEnabled: true,
          metricsEnabled: true,
        },
        description: "This service serves portfolio data.",
        domainName: {
            domainName,
            certificate,
            securityPolicy: SecurityPolicy.TLS_1_2,
            endpointType: EndpointType.EDGE,
        },
        defaultCorsPreflightOptions: {
            statusCode: 200,
            allowOrigins: [`https://${props.domainName}`],
            allowMethods: ['OPTIONS','GET'],
            allowHeaders: Cors.DEFAULT_HEADERS,
        },
        disableExecuteApiEndpoint: true,
    });

    new CfnOutput(this, 'apiUrl', { value: api.url });

    new ARecord(this, `ServiceAliasRecord`, {
      zone,
      recordName: domainName,
      target: RecordTarget.fromAlias(new ApiGateway(api)),
    });
  }
}