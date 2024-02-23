# DevPortfolio

DevPortfolio is a serverless, scalable, and easy-to-deploy portfolio template for developers designed to showcase your projects, skills, and experience on a modern, responsive website.

## Features

- **Responsive Design:** Adapts smoothly to any screen size.
- **Serverless Backend:** Leverages AWS services Lambda, S3, ApiGateWay, CloudFront for high scalability and availability.
- **Modern UI/UX:** Provides a clean and engaging user experience.
- **External Integrations:** Fetches projects from GitHub and blog posts from Medium and Dev.to.

## Tech Stack

- **Frontend:** React, SCSS
- **Backend:** AWS Lambda (Serverless)
- **Infrastructure as Code:** AWS Cloud Development Kit (CDK)
- **CI/CD:** GitHub Actions (or specify if you use another tool)
- **Other Tools:** Docker, Jest for testing

## AWS CDK for Infrastructure

The project uses AWS CDK for defining cloud resources in a programmatic and reusable way. This includes the setup for a static website hosted on S3 and served via CloudFront, and a REST API using Lambda and API Gateway.

## Pre-requesites

This project has an active integration with github for fetching your projects, with Medium and Dev.to for fetching your blogs. To have functionality working this follow below steps:

1. As a pre-requisite have a domain registered where you would want to host this project (This is optional if you do not want to host your project in AWS and just want to run it in local).
2. Once your have your own domain, you need to log into to AWS Account and create a hostedZone with the newly registered domain. (Again, this is also optional step and is applicable only if you really want to host your site to AWS).
3. Make sure you have AWS CLI installed and are credentialed with your AWS Account to which you want to deploy. (This is also optional step and is only to deploy your resources to AWS cloud.
4. Create a folder named `config` under your project root directory.
5. Change the directory to this newly created folder and create a file called `default.json`.
6. Now the file should have below environment varibales set:
   ```
   {
    "blogs": {
      "mediumUserName": "<paste your medium username here>",
      "devToUserName": "<paste your dev.to username here>"
    },
    "gitHubProfile": {
      "userName": "<paste your github profile name here>",
      "token": "<paste your github personal access token here>"
    },
    "dns": {
      "domain": "<paste your domain name here>",
      "serviceSubDomain": "api"
    },
    "aws": {
      "account": "<paste your AWS acount id to which you want to deploy your project>",
      "region": "us-east-1"
    }
   }
   ```

## Installation

To set up the project in local:

1. Clone the repository:
   ```
   git clone https://github.com/dixitrathod16/devportfolio.git
   ```
2. Install the dependencies:
   ```
   npm i
   ```
3. Run the Project:
   ```
   npm start
   ```
4. After this your website will be now up and running in your local at `http://localhost:4200`.

## Deployment to AWS

1. Bootstrap AWS CDK (if not already done) using below command:
   ```
   cdk bootstrap
   ```
2. To deploy this project to your AWS Account and make it live, use below command
   ```
   cdk deploy
   ```
