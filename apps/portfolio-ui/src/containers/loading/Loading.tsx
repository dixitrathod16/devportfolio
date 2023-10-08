import React, { ReactElement } from "react";
import "./loading.scss";

const Loading = (): React.ReactElement => {
  const renderCircles = (): React.ReactNodeArray => {
    const circles: React.ReactNode[] = [];
    for (let i = 1; i <= 12; i++) {
      circles.push(<div key={`circle${i}`} className={`sk-circle${i} sk-child`} />);
    }
    return circles;
  };

  return (
    <div className="centerContent">
      <div className="sk-circle">
        {renderCircles()}
      </div>
    </div>
  );
};

export default Loading;
