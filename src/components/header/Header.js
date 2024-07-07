import styles from "./Header.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const placeholder = "https://via.placeholder.com/100";


function isAdmin() { // 관리자 여부 확인
  const path = window.location.pathname;
  console.log(path)
  // 실제 사용자 인증 로직으로 교체
  return path.includes('/admin')
}

const Header = () => {
  console.log(isAdmin())

  // 관리자용 메뉴 항목
  const adminMenu = `
    <a href="/admin/notice">공지사항</a>
    <a href="/admin/user-list">직원정보</a>
    <a href="/admin/attend">근태관리</a>
    <a href="/admin/commute">출퇴근관리</a>
  `;

  // 일반 사용자용 메뉴 항목
  const userMenu = `
    <a href="/user/attend">근태현황</a>
    <a href="/user/my-page">마이페이지</a>
  `;
  const menuItems = isAdmin ? adminMenu : userMenu;

  return `
    <header class="${cx("header")}">
      <div class="${cx("logo")}">Intranet</div>
      <nav class="${cx("menu")}">
          ${menuItems}
          <img alt="사진임" src=${placeholder}>
      </nav>
      <ion-icon class="${cx("toggle-btn")}" name="menu-outline"></ion-icon>
    </header>
  `;
};

export default Header;