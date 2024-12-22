# DevPortfolio

DevPortfolio is a serverless, scalable, and easy-to-deploy portfolio template for developers designed to showcase your projects, skills, and experience on a modern, responsive website.

## Features

- **Responsive Design:** Adapts smoothly to any screen size
- **Serverless Backend:** Leverages AWS services (Lambda, S3, ApiGateway, CloudFront) for high scalability and availability
- **Modern UI/UX:** Clean and engaging user experience with React-based frontend
- **External Integrations:** Fetches projects from GitHub and blog posts from Medium and Dev.to
- **Infrastructure as Code:** AWS CDK for automated resource provisioning
- **Build System:** Efficient build process using esbuild

## Project Structure

```
devportfolio/
├── apps/                    # Main application code
│   ├── portfolio-ui/        # React frontend application
│   └── portfolio-serverless-backend/  # AWS Lambda backend
├── web/                     # Built frontend assets
├── config/                  # Configuration files
├── lib/                     # CDK infrastructure code
├── bin/                     # CDK app entry point
└── esbuild.ts              # Build configuration
```

## Tech Stack

- **Frontend:**
  - React
  - SCSS
  - Modern web assets (PWA ready with manifest.json)
- **Backend:**
  - AWS Lambda (Serverless)
  - API Gateway
- **Infrastructure:**
  - AWS CDK (Infrastructure as Code)
  - S3 for static hosting
  - CloudFront for content delivery
- **Build Tools:**
  - esbuild for fast bundling
  - TypeScript for type safety
- **Testing:** Jest

## Prerequisites

1. Node.js and npm installed
2. AWS Account (for deployment)
3. Domain name (optional, for hosting)
4. Required API access:
   - GitHub Personal Access Token
   - Medium account
   - Dev.to account

## Configuration

1. Create a `config` directory in the project root
2. Add `default.json` in the config directory with the following structure to run locally:

```json
{
  "blogs": {
    "mediumUserName": "<your-medium-username>",
    "devToUserName": "<your-dev.to-username>"
  },
  "gitHubProfile": {
    "userName": "<your-github-username>",
    "token": "<your-github-personal-access-token>"
  },
  "dns": {
    "domain": "localhost:4200",
    "serviceSubDomain": ""
  }
}
```

3. Add `prod.json` in the config directory with the following structure to deploy to AWS:

```json
{
  "blogs": {
    "mediumUserName": "<your-medium-username>",
    "devToUserName": "<your-dev.to-username>"
  },
  "gitHubProfile": {
    "userName": "<your-github-username>",
    "token": "<your-github-personal-access-token>"
  },
  "dns": {
    "domain": "<your-domain-name>",
    "serviceSubDomain": "api"
  },
  "aws": {
    "account": "<your-aws-account-id>",
    "region": "<your-aws-region>"
  }
}
```

## Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/dixitrathod16/devportfolio.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:4200`

## Customization

The portfolio can be customized by modifying the `apps/portfolio-ui/src/portfolio.ts` file. This file contains all the configuration for your personal portfolio including:

### Basic Information
- **Splash Screen:** Customize the animation shown during initial load
- **Greeting:** Update your name, title, subtitle, and resume link
- **Social Media:** Configure links to your GitHub, LinkedIn, Gmail, Facebook, Medium, Instagram, and Dev.to profiles

### Professional Information
- **Skills Section:** List your technical skills and software proficiencies
- **Education:** Add your educational background with school logos and descriptions
- **Tech Stack:** Display your proficiency levels in different technology stacks
- **Work Experience:** List your professional experience with company logos and dates
- **Open Source:** Configure GitHub profile display
- **Projects:** Showcase your major projects with descriptions and links
- **Achievements:** Add certifications, awards, and other accomplishments
- **Blog Section:** Enable/disable Medium and Dev.to blog integration
- **Contact Information:** Update your contact details

To customize:
1. Open `apps/portfolio-ui/src/portfolio.ts`
2. Update the relevant sections with your information
3. Set `display: false` for any sections you want to hide
4. For icons, use Font Awesome class names (referenced in the file)
5. Add your images to the `assets/images` directory and update image paths accordingly

## AWS Deployment

1. Ensure AWS CLI is installed and configured with your credentials

2. Bootstrap AWS CDK (first-time only):

   ```bash
   npm run bootstrap
   ```

3. Deploy the application:
   ```bash
   npm run deploy
   ```

## Additional Notes

- The project uses esbuild for fast and efficient bundling
- Frontend assets are optimized and include PWA support
- Backend is fully serverless with pay-per-use pricing
- CDK deployment creates all necessary AWS resources automatically

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
