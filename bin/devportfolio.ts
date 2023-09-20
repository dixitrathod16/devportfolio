#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DevportfolioStack } from '../lib/devportfolio-stack';

const app = new cdk.App();
new DevportfolioStack(app, 'DevportfolioStack');
