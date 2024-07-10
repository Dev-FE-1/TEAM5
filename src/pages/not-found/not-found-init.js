import Lottie from "lottie-web";
import classNames from "classnames/bind";
import styles from "./not-found.module.css";

const cx = classNames.bind(styles);

const init = () => {
  const container = document.querySelector(`.${cx("lottie-container")}`);

  const aniData = {
    container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://lottie.host/95a2d56b-cec5-4456-a8ed-0883dc04c704/AaJ2DOnVkT.json",
  };

  Lottie.loadAnimation(aniData);
};

export default init;
