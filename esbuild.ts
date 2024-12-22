import { build, BuildOptions, BuildResult, context } from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import { createServer, request, Server, ServerResponse } from "http";
import path from "path";
import { handler as portfolioFunction } from "./apps/portfolio-serverless-backend/portfolioService";
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import copyStaticFiles from 'esbuild-copy-static-files';
import config from 'config';

const clients: ServerResponse[] = [];

const mode = process.argv[2];
const env = mode === "build" ? "production" : "development";

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

const buildOptions: BuildOptions = {
  bundle: true,
  define: {
    "process.env.NODE_ENV": `"${env}"`,
    "process.env.API_BASEURL": serviceSubDomain ? `"https://${serviceSubDomain}.${domain}"` : `"http://${domain}"`,
  }, // must be double-quoted
  entryPoints: ["apps/portfolio-ui/src/index.tsx"],
  treeShaking: true,
  minify: true,
  outfile: "web/bundle.js",
  loader: {
    ".png": "file",
    ".jpg": "file",
    ".jpeg": "file",
    ".svg": "file",
    ".webp": "file",
  },
  assetNames: "assets/[name]-[hash]",
  plugins: [
    sassPlugin({
      type: "style",
      loadPaths: [path.resolve(__dirname, "node_modules")],
    }),
    copyStaticFiles({
      src: 'apps/portfolio-ui/src/public',
      dest: 'web',
      dereference: true,
      errorOnExist: false,
      preserveTimestamps: true,
      recursive: true,
    }),
  ],
  sourcemap: true,
};

export const run = async (mode: string): Promise<BuildResult | Server> => {
  // If mode is build just build the bundle
  if (mode === "build") {
    return await build(buildOptions);
  }

  await build({
    ...buildOptions,
    banner: {
      js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();',
    },
  });

  const ctx = await context(buildOptions);
  ctx.watch();

  return ctx.serve({ servedir: "web" }).then(() => {
    console.log("Starting web app on http://localhost:4200");

    // Start a simple server that sends reload events to all connected clients
    return createServer(async (req, res) => {
      const { url, method, headers } = req;
      // If the URL is /esbuild, send an SSE stream of reload events
      if (req.url === "/esbuild") {
        return clients.push(
          res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          })
        );
      }

      // If the URL is /getBlogs or /getGithubProfile, invoke the portfolio lambda handler
      if (
        req.url?.includes("/getBlogs") ||
        req.url?.includes("/getGithubProfile")
      ) {
        const event = {
          httpMethod: "GET",
          path: req.url?.includes("/getBlogs")
            ? "/getBlogs"
            : "/getGithubProfile",
        } as APIGatewayProxyEvent;

        process.env.GITHUB_TOKEN = token;
        process.env.GITHUB_USERNAME = userName;
        process.env.MEDIUM_USERNAME = mediumUserName;
        process.env.DEV_TO_USERNAME = devToUserName;
        process.env.DOMAIN_NAME = domain;

        const lambdaResponse = await portfolioFunction(event);
        res.writeHead(lambdaResponse.statusCode, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:4200",
        });
        res.write(lambdaResponse.body);
        res.end();
        return;
      }

      const websitePath = url?.includes(".") ? url : "/index.html";
      req.pipe(
        request(
          {
            hostname: "0.0.0.0",
            port: 8000,
            path: websitePath,
            method,
            headers,
          },
          (prxRes) => {
            res.writeHead(prxRes.statusCode || 500, prxRes.headers);
            prxRes.pipe(res, { end: true });
          }
        ),
        { end: true }
      );
      return;
    }).listen(4200);
  });
};

run(mode);
