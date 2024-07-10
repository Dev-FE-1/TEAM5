import classNames from "classnames/bind";
import { delete_icon, edit_icon, search_icon } from "../../../assets/icons";
import { black } from "../../../constants/colors";
import styles from "./commute.module.css";

const cx = classNames.bind(styles);

const render = () => `
  <section class="${cx("container")}">
    <header class="${cx("header")}">
      <div class="${cx("header-title")}">
        <h1>출퇴근 현황</h1>
        <div class="${cx("search")}">
          <input type="text" placeholder="사원명" />
          ${search_icon()}
        </div>
      </div>
      <select>
        <option value="all">모두 보기</option>
        <option>정상</option>
        <option>결근</option>
        <option>지각</option>
        <option>조퇴</option>
      </select>
    </header>
    <div class="${cx("requests")}">
      <div class="${cx("grid", "request-header")}">
        <div>상태</div>
        <div>사원명</div>
        <div>일시</div>
        <div>출근 시간</div>
        <div>퇴근 시간</div>
        <div>비고</div>
      </div>
      <div class="${cx("request-item-container")}">
      </div>
`;

export default render;
