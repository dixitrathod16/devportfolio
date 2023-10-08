import React from "react";
import "./BlogCard.scss";

interface Blog {
  title: string;
  description: string;
  url: string;
  image?: string;
}

interface BlogCardProps {
  blog: Blog;
  isDark: boolean | undefined;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, isDark }) => {
  function openUrlInNewTab(url: string, name: string) {
    if (!url) {
      console.log(`URL for ${name} not found`);
      return;
    }
    var win = window.open(url, "_blank");
    win?.focus();
  }

  return (
    <div onClick={() => openUrlInNewTab(blog.url, blog.title)}>
      <div className={isDark ? "blog-container dark-mode" : "blog-container"}>
        <a
          className={
            isDark ? "dark-mode blog-card blog-card-shadow" : "blog-card"
          }
          href="#blog"
        >
          <h3 className={isDark ? "small-dark blog-title" : "blog-title"}>
            {blog.title}
          </h3>
          <p className={isDark ? "small-dark small" : "small"}>
            {blog.description}
          </p>
          <div className="go-corner">
            <div className="go-arrow">→</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default BlogCard;