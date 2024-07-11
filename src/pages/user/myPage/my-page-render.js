import classNames from "classnames/bind";
import styles from "./my-page.module.css";

const cx = classNames.bind(styles);

const render = () => `
  <section class="${cx("content-container")}">
    
    <!-- 프로필 -->
    <div class="${cx("profile", "content")}">
      <h2 class="${cx("subtitle")}">프로필</h2>
      <div class="${cx("profile-container")}">
        <img id="profile-image" src="#" alt="프로필 이미지" />
        <div class="${cx("profile-info")}">
          <p>이름 : <span id="name"></span></p>
          <p>팀 : <span id="team"></span></p>
          <p>직급 : <span id="position"></span></p>
          <p>사번 : <span id="userId"></span></p>
          <p>이메일 : <span id="email"></span></p>
        </div>
      </div>
    </div>

    <!-- 공지사항 -->
    <div class="${cx("notices", "content")}">
      <h2 class="${cx("subtitle")}">공지사항</h2>
      
      <div class="${cx("notices-content-wrapper")}">
        <div class="${cx("notices-content")}">
        <!-- 공지 컨텐츠 -->
        </div>
      </div>
    </div>

    <!-- 출퇴근 -->
    <div class="${cx("commutes", "content")}">
      <div class="${cx("subtitle", "attends-subtitle")}">
        <h2>출퇴근현황</h2>
        <a href="./commute">${'> 자세히 보기'}</a>
      </div>
      <div class="${cx("work-timer")}">
      <p> 상태 : <span id="statusBadge" class="${cx("badge")}">출근 전</span></p>
        <div class="${cx("timer")}">
            <span id="timer">00:00:00</span>
        </div>
        <div class="${cx("work-controls")}">
          <label class="${cx("switch")}">
            <input type="checkbox" id="workToggle">
            <span class="${cx("slider", "round")}"></span>
          </label>
        </div>
        <p class="startWorkTime" id="startWorkTime">출근 시간 : </p>
        <p class="endWorkTime" id="endWorkTime">퇴근 시간 : </p>
      </div>
    </div>

    <!-- 근태 -->
    <div class="${cx("attends", "content")}">
      <div class="${cx("subtitle", "attends-subtitle")}">
        <h2>근태현황</h2>
        <a href="./attend">${'> 자세히 보기'}</a>
      </div>
        <div class="${cx("attends-list")}">
          <div class="${cx("attends-grid", "attends-header")}">
            <span>구분</span>
            <span>시작일</span>
            <span>종료일</span>
            <span>내용</span>
          </div>
          <div class="${cx("attends-content")}"></div>
        </div>
    </div>

    <!-- 모달  -->
    <div id="modal" class="${cx("modal")}">
      <div class="${cx("modal-content")}">
        <div class="${cx("a-text")}"></div>
        <div class="${cx("modal-actions")}">
          <button id="confirmButton" class="${cx("btn", "btn-confirm")}">확 인</button>
          <button id="cancelButton" class="${cx("btn", "btn-cancel")}">취 소</button>
        </div>
      </div>
    </div>
  </section>
`;

export default render;
