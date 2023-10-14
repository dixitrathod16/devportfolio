import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PortFolioSite } from '../constructs/website';
import { PortFolioApi } from '../constructs/restApi';

export interface DevportfolioStackProps extends StackProps {
  mediumUserName: string;
  devToUserName: string;
  userName: string;
  token: string;
  domain: string;
  serviceSubDomain: string;
}

export class DevportfolioStack extends Stack {
  constructor(scope: Construct, id: string, props?: DevportfolioStackProps) {
    super(scope, id, props);

    new PortFolioSite(this, 'PortfolioSite', {
      domainName: props!.domain,
    });

    new PortFolioApi(this, 'PortfolioApi', {
      domainName: props!.domain,
      serviceSubDomain: props!.serviceSubDomain,
      mediumUserName: props!.mediumUserName,
      devToUserName: props!.devToUserName,
      userName: props!.userName,
      token: props!.token,
    });
  }
}
