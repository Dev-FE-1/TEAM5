import classNames from "classnames/bind";
import styles from "./attend.module.css";

const cx = classNames.bind(styles);

const render = async () => {
  return `
    <header class="${cx("main-content-header")}">
      <div class="${cx("header-title")}">
        <h1>근태현황</h1>
      </div>
      
      <div class='${cx("header-sub")}'>
        <select id='searchType' class='${cx("searchType")}'>
          <option value=''>모두보기</option>
          <option value='연차'>연차</option>
          <option value='반차'>반차</option>
          <option value='조퇴'>조퇴</option>
        </select>

        <div class=${cx("createBtn")}>
          <input type='hidden' id='openType' value='add' />
          <button type='button'>근태 등록</button>
        </div>
      </div>
    </header>

    <div class="${cx("requests")}">
      <div class="${cx("grid", "request-header")}">
        <div>구분</div>
        <div>일시</div>
        <div>사번</div>
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
