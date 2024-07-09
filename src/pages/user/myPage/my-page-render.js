import classNames from "classnames/bind";
import styles from "./my-page.module.css";

const cx = classNames.bind(styles);

const render = () => `
  <section class="${cx("content-container")}">
    
    <!-- 프로필 -->
    <div class="${cx("profile", "content")}">
      <h2>프로필</h2>
      <img id="profile-image" src="#" alt="프로필 이미지" />
      <p>이름 : <span id="name"></span></p>
      <p>팀 : <span id="team"></span></p>
      <p>직급 : <span id="position"></span></p>
      <p>이메일 : <span id="email"></span></p>
      <p>사번 : <span id="userId"></span></p>
      <button class="${cx("open-modal-btn", "btn")}">프로필 수정하기</button>
    </div>

    <!-- 공지사항 -->
    <div class="${cx("notices", "content")}">
      <h2>공지사항</h2>
      <div class="${cx("notices-content")}"></div>
    </div>

    <!-- 출퇴근 -->
    <div class="${cx("commutes", "content")}">
      <h2> 출퇴근현황</h2>
      <div class="${cx("work-timer")}">
        <div class="${cx("timer")}">
            <span id="timer">00:00:00</span>
        </div>
        <p> 상태 : <span id="statusBadge" class="${cx("badge")}">출근 전</span></p>
        <div class="${cx("work-controls")}">
          <label class="${cx("switch")}">
            <input type="checkbox" id="workToggle">
            <span class="${cx("slider", "round")}"></span>
          </label>
        </div>
        <p class="startWorkTime" id="startWorkTime">출근 시간: </p>
        <p class="endWorkTime" id="endWorkTime">퇴근 시간: </p>
      </div>
    </div>

    <!-- 근태 -->
    <div class="${cx("attends", "content")}">
      <h2>근태현황</h2>
        <div class="${cx("attends-list")}">
          <div class="${cx("attends-header")}">
            <span>구분</span>
            <span>시작일</span>
            <span>종료일</span>
            <span>내용</span>
            <span>이름</span>
          </div>
          <div class="${cx("attends-content")}"></div>
        </div>
        <a href="/user/attend"><button class="${cx("attends-btn", "btn")}">근태신청 바로가기</button></a>
    </div>

    <!-- 모달  -->
    <div id="modal" class="${cx("modal")}">
      <div class="${cx("modal-content")}">
        <div class="${cx("close")}">&times;</div>
        <h2>프로필 수정</h2>
        <div class="${cx("info-item")}">
          <label for="modal-name">이름:</label>
          <input type="text" id="modal-name">
        </div>
        <div class="${cx("info-item")}">
          <label for="modal-team">팀:</label>
          <input type="text" id="modal-team">
        </div>
        <div class="${cx("info-item")}">
          <label for="modal-position">직급:</label>
          <input type="text" id="modal-position">
        </div>
        <div class="${cx("info-item")}">
          <label for="modal-email">이메일:</label>
          <input type="text" id="modal-email">
        </div>
        <div class="${cx("info-item")}">
          <label for="modal-password">비밀번호:</label>
          <input type="password" id="modal-password">
        </div>
        <div class="${cx("info-item")}">
          <label for="modal-image">이미지 첨부:</label>
          <input type="file" id="modal-image" accept="image/*">
          <img id="modal-image-preview" src="#" alt="이미지 미리보기" style="width: 100px; height: 100px; object-fit: cover; margin-top: 10px;">
        </div>
        <button class="${cx('modify-modal-btn', 'btn')}">수정완료</button>
      </div>
    </div>
  </section>
`;

export default render;
