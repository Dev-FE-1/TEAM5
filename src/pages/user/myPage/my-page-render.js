import classNames from "classnames/bind";
import styles from "./my-page.module.css";

const cx = classNames.bind(styles);



const render = () => `
  <section class="${cx("content-container")}">
    
    <!-- 프로필 -->
    <div class="${cx("profile", "content")}">
      <h2>프로필</h2>
      <!-- <img src="./img/logo.jpg" alt="프로필사진"> -->
      <img id="profile-image" src="#" alt="프로필 이미지" />
      <!-- <p>홍길동</p>
      <p>Email : 배달의 민족@intranet.com</p>
      <p>직급: 품질환경부서 부장</p>
      <p>사번: 123456</p>
      <p>전화번호: 010-1234-5678</p> -->
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
      <div class="${cx("notices-content")}">
        <!-- <div class="${cx("notices-item")}">
          <img class="${cx("notices-image")}" src="#" alt="이미지1" />
          <div class="${cx("notice-text")}">
            <p>2024년 회사 연말 파티</p>
            <p>2024년 연말 파티가 12월 24일에 열립니다. 많은 참여 바랍니다</p>
            <p>2024-12-24</p>
          </div>
        </div>
        <div class="${cx("notices-item")}">
          <img class="${cx("notices-image")}" src="#" alt="이미지2" />
          <div class="${cx("notice-text")}">
            <p>2024년 여름 휴가 일정</p>
            <p>2024년 여름 휴가는 7월 20일부터 8월 5일까지입니다</p>
            <p>2024-07-20</p>
          </div>
        </div>
        <div class="${cx("notices-item")}">
          <img class="${cx("notices-image")}" src="#" alt="이미지3" />
          <div class="${cx("notice-text")}">
            <p>보안 점검 안내</p>
            <p>보안 점검이 2024년 10월 10일에 실시됩니다</p>
            <p>2024-10-10</p>
          </div>             
        </div> -->
      </div>
    </div>



    <!-- 출퇴근 -->
    <!-- <div class="${cx("commutes", "content")}">
      <h2> 출퇴근현황</h2>
      <div class="${cx("work-timer")}">
        <div class="${cx("timer")}">
          <span id="timer">00:00:00</span>
        </div>
        <p> 현시각 : <span class="${cx("badge")}">근무중</span></p>
        <div class="${cx("work-controls")}">
          <button class="${cx("start-btn", "btn")}">근무시작</button>
          <label class="${cx("switch")}">
            <input type="checkbox">
            <span class="${cx("slider", "round")}"></span>
          </label>
          <button class="${cx("stop-btn", "btn")}">근무종료</button>
        </div>
      </div>
    </div> -->

    <!-- 출퇴근 -->
    <div class="${cx("commutes", "content")}">
      <h2> 출퇴근현황</h2>
      <div class="${cx("work-timer")}">
          <div class="${cx("timer")}">
              <span id="timer">00:00:00</span>
          </div>
          <p> 현시각 : <span id="statusBadge" class="${cx("badge")}">출근 전</span></p>
          <div class="${cx("work-controls")}">
              <button id="startButton" class="${cx("start-btn", "btn")}">출 근</button>
              <label class="${cx("switch")}">
                  <input type="checkbox" id="workToggle">
                  <span class="${cx("slider", "round")}"></span>
              </label>
              <button id="endButton" class="${cx("stop-btn", "btn")}">퇴 근</button>
          </div>
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
          <!-- <div class="${cx("attends-item")}">
            <span class="${cx("badge")}">조퇴</span>
            <span>6/19</span>
            <span>병원내원</span>
            <span>홍길동</span>
            </div>
          <div class="${cx("attends-item")}">
            <span class="${cx("badge")}">연차</span>
            <span>6/19~6/23</span>
            <span>여름휴가</span>
            <span>박부장</span>
          </div>
          <div class="${cx("attends-item")}">
            <span class="${cx("badge")}">반차</span>
            <span>6/21</span>
            <span>아파</span>
            <span>홍길동</span>
          </div> -->
        </div>
        
        <a href="./now.html"><button class="${cx("attends-btn", "btn")}">근태신청 바로가기</button></a>
    </div>


    <!-- 모달  -->
    <div class="${cx('modal')}">
      <div class="${cx('modal-profile')}">
        <h2>프로필 수정</h2>
        <ul>
          <li>이름</li>
          <li>이메일</li>
          <li>직급</li>
          <li>전화번호</li>
          <li>선아님 코드로 넣기, 성현님이 주신 변수명으로 적용해보기</li>
        </ul>
        <button class="${cx('close-modal-btn', 'btn')}">수정완료</button>
      </div>
    </div>



    
  </section>
  `;

export default render;

