import React, { Suspense } from "react";
import Lottie from "lottie-react";
import Loading from "../../containers/loading/Loading";

interface DisplayLottieProps {
  animationData: any; // You should specify the actual type for animationData
}

const DisplayLottie: React.FC<DisplayLottieProps> = ({ animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <Suspense fallback={<Loading />}>
      <Lottie
        animationData={defaultOptions.animationData}
        loop={defaultOptions.loop}
      />
    </Suspense>
  );
};

export default DisplayLottie;