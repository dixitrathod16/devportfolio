import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from "axios";

// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
// const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;
// const DEV_TO_USERNAME = process.env.DEV_TO_USERNAME;

const GITHUB_TOKEN = "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";
const GITHUB_USERNAME = "dixitrathod16";
const MEDIUM_USERNAME = "dixitrathod16";
const DEV_TO_USERNAME = "dixitjain";

interface Blog {
  title: string;
  link: string;
  thumbnail: string;
  description: string;
}

interface MediumBlog {
  title: string;
  link: string;
  thumbnail: string;
  description: string;
}

interface DevToBlog {
  title: string;
  url: string;
  cover_image: string;
  description: string;
}

const extractTextContent = (html: string): string => {
  return html
    .split("p>")
    .filter((el) => !el.includes(">"))
    .map((el) => el.replace("</", ".").replace("<", ""))
    .join(" ");
};

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.httpMethod === "GET" && event.path === "/getBlogs") {
      const blogs: Blog[] = [];

      if (MEDIUM_USERNAME !== undefined) {
        const { data } = await axios.get(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
        );
        data.items.forEach((item: MediumBlog): void => {
          blogs.push({
            title: item.title,
            link: item.link,
            thumbnail: item.thumbnail,
            description: extractTextContent(item.description),
          });
        });
      }

      if (DEV_TO_USERNAME !== undefined) {
        const { data } = await axios.get(
          `https://dev.to/api/articles?username=${DEV_TO_USERNAME}`
        );
        data.forEach((item: DevToBlog): void => {
          blogs.push({
            title: item.title,
            link: item.url,
            thumbnail: item.cover_image,
            description: item.description,
          });
        });
      }

      // return the blogs
      return {
        statusCode: 200,
        body: JSON.stringify(blogs),
      };
    }

    if (event.httpMethod === "GET" && event.path === "/getGithubProfile") {
      const query = `
                query {
                  user(login: "${GITHUB_USERNAME}") {
                    name
                    bio
                    avatarUrl
                    location
                    pinnedItems(first: 6, types: [REPOSITORY]) {
                      totalCount
                      edges {
                          node {
                            ... on Repository {
                              name
                              description
                              forkCount
                              stargazers {
                                totalCount
                              }
                              url
                              id
                              diskUsage
                              primaryLanguage {
                                name
                                color
                              }
                            }
                          }
                        }
                      }
                    }
                }
                `;

      // Make the request
      const { data } = await axios.post(
        "https://api.github.com/graphql",
        { query },
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
  return {
    statusCode: 404,
    body: JSON.stringify({}),
  };
};
