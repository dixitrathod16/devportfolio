import React, { useContext } from "react";
import "./Footer.scss";
import { Fade } from "react-awesome-reveal";
import emoji from "react-easy-emoji";
import StyleContext from "../../store/context";

const Footer: React.FC = () => {
  const { isDark } = useContext(StyleContext);

  return (
    <Fade direction="up" duration={1000}>
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {emoji("Made with ❤️ In India 🇮🇳")}
        </p>
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          Theme by Dixit R Jain
        </p>
      </div>
    </Fade>
  );
};

export default Footer;