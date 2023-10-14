#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DevportfolioStack } from '../lib/stacks/devportfolio-stack';
import config from 'config';

const { mediumUserName, devToUserName } = config.get<{
  mediumUserName: string;
  devToUserName: string;
}>("blogs");

const { userName, token } = config.get<{
  userName: string;
  token: string;
}>("gitHubProfile");

const { domain, serviceSubDomain } = config.get<{
  domain: string;
  serviceSubDomain: string;
}>("dns");

const { account, region} = config.get<{
  account: string;
  region: string;
}>("aws");

const app = new cdk.App();
new DevportfolioStack(app, 'DevportfolioStack',{
    env: {
        account,
        region
    },
    mediumUserName,
    devToUserName,
    userName,
    token,
    domain,
    serviceSubDomain,
});
