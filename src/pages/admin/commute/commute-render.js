import classNames from "classnames/bind";
import { fetchCommutes } from "../../../api/commuteApi";
import { delete_icon, edit_icon, search_icon } from "../../../icons";
import styles from "./commute.module.css";

const cx = classNames.bind(styles);

const render = async () => `
  <section class="${cx("container")}">
    <header class="${cx("header")}">
      <div class="${cx("header-title")}">
        <h1>출퇴근 관리(admin)</h1>
        <div class="${cx("search")}">
          <input type="text" placeholder="사원명" />
          <img src=${search_icon} class="${cx("icon")}" alt='search-icon'>
        </div>
      </div>
      <select>
        <option value="all">모두 보기</option>
        <option value="present">정상</option>
        <option value="absent">결근</option>
        <option value="late">지각</option>
        <option value="early-leave">조퇴</option>
      </select>
    </header>
    <div class="${cx("requests")}">
      <div class="${cx("grid", "request-header")}">
        <div>상태</div>
        <div>사원명</div>
        <div>일시</div>
        <div>출근 시간</div>
        <div>퇴근 시간</div>
        <div>수정 / 삭제</div>
      </div>
    ${await list_items()}    
`;

const list_items = async () => {
  const res = await fetchCommutes();
  return res
    .map(
      ({ userId, date, arriveTime, leaveTime }) => `
    <div class="${cx("grid", "request-item")}">
      <div>정상</div>
      <div>${userId}</div>
      <div>${date}</div>
      <div>${arriveTime}</div>
      <div>${leaveTime}</div>
      <div class="${cx("request-tools")}">
        <img src=${edit_icon} class="${cx("icon")}" alt="edit-icon">
        <img src=${delete_icon} class="${cx("icon")}" alt="delete-icon">
      </div>
    </div>
  `
    )
    .join("");
};

export default render;
