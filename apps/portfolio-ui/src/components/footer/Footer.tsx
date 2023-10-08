import React, { useContext } from "react";
import "./Footer.scss";
import { motion } from "framer-motion";
import emoji from "react-easy-emoji";
import StyleContext from "../../store/context";

const Footer: React.FC = () => {
  const { isDark } = useContext(StyleContext);

  return (
    <motion.div
      initial={{ y: 30 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.8, type: "tween", stiffness: 100 }}
      viewport={{ once: true }}
    >
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {emoji("Made with ❤️ In India 🇮🇳")}
        </p>
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          Theme by Dixit R Jain
        </p>
      </div>
    </motion.div>
  );
};

export default Footer;