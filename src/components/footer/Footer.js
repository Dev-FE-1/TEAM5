import styles from "./Footer.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Footer = () => `
  <footer class=${cx("container")}>
    <p>&copy; 2024 Intranet. All rights reserved.</p>
  </footer>
`;

export default Footer