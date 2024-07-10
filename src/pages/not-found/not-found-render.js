import classNames from "classnames/bind";
import styles from "./not-found.module.css";

const cx = classNames.bind(styles);

const render = () => `
<div class="${cx("lottie-container")}"></div>
<div class="${cx("message")}">
  <p>페이지를 찾을 수 없습니다.... </P>
  <div class="${cx("emotion-container")}">
    <div class="${cx("emotion")}">ㅠ_ㅠ</div>
  </div>
</div>
`;

export default render;
