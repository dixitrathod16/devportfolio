import React, { useState, useEffect, useContext, ReactElement } from "react";
import "./Blog.scss";
import BlogCard from "../../components/blogCard/BlogCard";
import { blogSection } from "../../portfolio";
import { Fade } from "react-awesome-reveal";
import StyleContext from "../../store/context";
import apiClient from "../../utils/apiClient";

interface Blog {
  title: string;
  link: string;
  thumbnail?: string;
  description: string;
}

const Blogs = (): ReactElement => {
  const { isDark } = useContext(StyleContext);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    apiClient.get('/getBlogs')
      .then((response) => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {
        blogSection.display && (
          <Fade direction={"up"} duration={1000}>
            <div className="main" id="blogs">
              <div className="blog-header">
                <h1 className="blog-header-text">{blogSection.title}</h1>
                <p
                  className={
                    isDark ? "dark-mode blog-subtitle" : "subTitle blog-subtitle"
                  }
                >
                  {blogSection.subtitle}
                </p>
              </div>
              <div className="blog-main-div">
                <div className="blog-text-div">
                  {blogs.map((blog, i) => {
                    return (
                      <BlogCard
                        key={i}
                        isDark={isDark}
                        blog={{
                          url: blog.link,
                          image: blog.thumbnail,
                          title: blog.title,
                          description: blog.description
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </Fade>
        )
      }
    </>
  );
}

export default Blogs;
