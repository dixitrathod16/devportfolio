import React, { useState, useEffect, useContext, Suspense, lazy } from "react";
import "./Project.scss";
import Button from "../../components/button/Button";
import { openSource, socialMediaLinks } from "../../portfolio";
import { StyleContext } from "../../store/context";
import Loading from "../loading/Loading";
import { motion } from "framer-motion";
import { GithubProfileContext } from "../../store/context";

const Projects: React.FC = (): React.ReactElement => {
  const GithubRepoCard = lazy(() =>
    import("../../components/githubRepoCard/GithubRepoCard")
  );
  const FailedLoading = () => null;
  const renderLoader = () => <Loading />;
  const { githubProfile } = useContext(GithubProfileContext);
  const { isDark } = useContext(StyleContext);
  const repos = githubProfile?.pinnedItems?.edges ?? [];

  if (
    !(typeof repos === "string" || repos instanceof String) &&
    openSource.display
  ) {
    return (
      <Suspense fallback={renderLoader()}>
          <motion.div
            initial={{ y: 300 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1, type: "twean", stiffness: 100 }}
            viewport={{ once: true }}
          >
          <div className="main" id="opensource">
            <h1 className="project-title">Open Source Projects</h1>
            <div className="repo-cards-div-main">
              {repos.map((v: any, i: number) => {
                if (!v) {
                  console.error(
                    `Github Object for repository number : ${i} is undefined`
                  );
                }
                return (
                  <GithubRepoCard repo={v} key={v.node.id} isDark={isDark} />
                );
              })}
            </div>
            <Button
              text={"More Projects"}
              className="project-button"
              href={socialMediaLinks.github}
              newTab={true}
            />
          </div>
          </motion.div>
      </Suspense>
    );
  } else {
    return <FailedLoading />;
  }
};

export default Projects;
