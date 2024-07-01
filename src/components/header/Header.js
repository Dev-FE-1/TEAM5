import styles from "./Header.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const placeholder = "https://via.placeholder.com/100";

const Header = () => `
  <header class="${cx("header")}">
    <div class="${cx("logo")}">Intranet</div>
    <nav class="${cx("menu")}">
        <a href="/admin/notice">공지사항</a>
        <a href="/admin/user-list">직원정보</a>
        <a href="/user/commute">출결정보</a>
        <a href="/admin/attend">근태관리</a>
        <a href="/user/attend">근태현황</a>
        <a href="/user/my-page">마이페이지</a>
        <img alt="사진임" src=${placeholder}>
    </nav>
    <ion-icon class="${cx("toggle-btn")}" name="menu-outline"></ion-icon>
  </header>  
`;

export default Header;
