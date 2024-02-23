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

This project has an active integration with github for fetching your projects, with Medium and Dev.to for fetching your blogs. To do this follow below steps:

1. Create a folder named `config` under your project root directory.
2. Change the directory to this newly created folder and create a file called `default.json`.
3. 

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
