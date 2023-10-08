import React, { useEffect } from "react";
import "./Top.scss";

const Top = (): React.ReactElement => {
  const TopEvent = (): void => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  const scrollFunction = (): void => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById("topButton")!.style.visibility = "visible";
    } else {
      document.getElementById("topButton")!.style.visibility = "hidden";
    }
  };

  useEffect(() => {
    window.onscroll = (): void => {
      scrollFunction();
    };

    window.onload = (): void => {
      scrollFunction();
    }; // To make sure that this button is not visible at starting.
  }, []);

  return (
    <button onClick={TopEvent} id="topButton" title="Go to top">
      <i className="fas fa-hand-point-up" aria-hidden="true"></i>
    </button>
  );
};

export default Top;
