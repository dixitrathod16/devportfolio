import React, { ReactElement, useContext } from "react";
import "./Achievement.scss";
import AchievementCard from "../../components/achievementCard/AchievementCard";
import { achievementSection } from "../../portfolio";
import StyleContext from "../../store/context";
import { motion } from "framer-motion";

const Achievement = (): ReactElement => {
  const { isDark } = useContext<any>(StyleContext);
  return (
    <>
      {
        achievementSection.display && (
          <motion.div
            initial={{ y: 300 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 1, type: "twean", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <div className="main" id="achievements">
              <div className="achievement-main-div">
                <div className="achievement-header">
                  <h1
                    className={
                      isDark
                        ? "dark-mode heading achievement-heading"
                        : "heading achievement-heading"
                    }
                  >
                    {achievementSection.title}
                  </h1>
                  <p
                    className={
                      isDark
                        ? "dark-mode subTitle achievement-subtitle"
                        : "subTitle achievement-subtitle"
                    }
                  >
                    {achievementSection.subtitle}
                  </p>
                </div>
                <div className="achievement-cards-div">
                  {achievementSection.achievementsCards.map((card, i) => {
                    return (
                      <AchievementCard
                        key={i}
                        isDark={isDark}
                        cardInfo={{
                          title: card.title,
                          description: card.subtitle,
                          image: card.image,
                          imageAlt: card.imageAlt,
                          footer: card.footerLink
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )
      }
    </>
  );
}

export default Achievement;
