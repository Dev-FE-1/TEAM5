import { findAll } from "../../../api/attendApi";
import styles from "./attend.module.css";
import classNames from "classnames/bind";
import { delete_icon, edit_icon } from "../../../assets/icons";
import { renderList } from './attend-init';

const cx = classNames.bind(styles);

const render = async () => {
  return `
    <header class="${cx("main-content-header")}">
      <div class="${cx("header-title")}">
        <h1>근태관리 (관리자)</h1>
      </div>
      
      <select id='searchType' class='${cx('searchType')}'>
        <option value=''>모두보기</option>
        <option value='연차'>연차</option>
        <option value='반차'>반차</option>
        <option value='조퇴'>조퇴</option>
      </select>
    </header>

    <div class="${cx("requests")}">
      <div class="${cx("grid", "request-header")}">
        <div>구분</div>
        <div>일시</div>
        <div>사원명</div>
        <div>제목</div>
        <div>내용</div>
        <div>수정/삭제</div>
      </div>
      <div class="${cx("grid", "request-item")}">
      </div>
      <div class="${cx("modal-container")}">
    </div>
    <div class="${cx("pagination")}"></div>
  `;
};

export default render;
