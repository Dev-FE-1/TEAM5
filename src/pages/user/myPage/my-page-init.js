import axios from "axios";
import classNames from "classnames/bind";
import styles from "./my-page.module.css";

const cx = classNames.bind(styles);

const loginUser = `kimpra2989`;

const init = async () => {
  // 프로필
  const 데이터 = await axios(`http://localhost:8080/api/users/${loginUser}`);

  console.log("데이터", 데이터);

  const { name, team, position, email, userId, imgUrl } = 데이터.data.data;

  document.getElementById("name").textContent = name;
  document.getElementById("team").textContent = team;
  document.getElementById("position").textContent = position;
  document.getElementById("email").textContent = email;
  document.getElementById("userId").textContent = userId;

  document.getElementById("profile-image").setAttribute("src", imgUrl);

  // 공지사항
  const noticesResponse = await axios("http://localhost:8080/api/notices");

  const placeholder = "https://via.placeholder.com/100";

  let noticesHtml = ""; // 템플릿을 저장할 변수

  const notices = noticesResponse.data.data;
  console.log("Notices", notices);

  notices.slice(0, 3).forEach(({ imgUrl, subject, content, date }) => {
    const template = `
      <div class="${cx("notices-item")}">
        <img class="${cx("notices-image")}" 
             src=${imgUrl ?? placeholder} alt="이미지"/>
        <div class="${cx("notice-text")}">
          <p class="${cx("subject")}">${subject}</p>
          <p class="${cx("content")}">${content}</p>
          <p class="${cx("date")}">${date}</p>
        </div>
      </div>
    `;
    noticesHtml += template;
  });

  document.querySelector(`.${cx("notices-content")}`).innerHTML = noticesHtml;

  // 근태사항
  const attendssResponse = await axios(
    `http://localhost:8080/api/attends/user/${loginUser}`
  );

  let attendsHtml = ""; // 템플릿을 저장할 변수

  const attends = attendssResponse.data.data;
  console.log("attends", attends);

  attends.slice(0, 4).forEach(({ type, startDate, endDate, content, userId }) => {
    const template = `
      <div class="${cx("attends-item")}">
        <span class="${cx("badge")}">${type}</span>
        <span>${startDate}</span>
        <span>${endDate}</span>
        <span>${content}</span>
        <span>${userId}</span>
      </div>
    `;
    attendsHtml += template;
  });

  console.log("attendsHtml", attendsHtml);

  document.querySelector(`.${cx("attends-content")}`).innerHTML = attendsHtml;

  // 모달
  const modal = document.querySelector(`.${cx("modal")}`);
  const btnOpenModal = document.querySelector(`.${cx("open-modal-btn")}`);
  const btnSaveModal = document.querySelector(`.${cx("modify-modal-btn")}`);
  const btnCloseModal = document.querySelector(`.${cx("close")}`);

  // 모달 켜기
  btnOpenModal.addEventListener("click", () => {
    modal.style.display = "block";
    // 데이터 불러오기
    document.querySelector("#modal-name").value = document.querySelector("#name").innerText;
  });
  btnCloseModal.addEventListener("click", () => {
    modal.style.display = "none";
  });


  // 출퇴근
  let isWorking = false; // 근무 상태를 나타내는 변수

  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    document.getElementById("timer").innerText = formatTime(
      hours * 3600 + minutes * 60 + seconds
    );
  }

  // 시간을 형식화하는 함수
  function formatTime(sec) {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }

  async function toggleWork() {
    const modal = document.querySelector(`.${cx("modal")}`);
    const aText = document.querySelector(`.${cx("a-text")}`);
    const now = new Date();
    const time =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0") +
      ":" +
      now.getSeconds().toString().padStart(2, "0");

    if (!isWorking) {
      // 출근 처리
      const props2 = {
        userId: loginUser,
        arriveTime: time,
      };

      try {
        const modifyResult = await axios.post(
          `http://localhost:8080/api/commutes/arrive`,
          props2
        );
        if (modifyResult.data.status === "success") {
          const actualArriveTime = modifyResult.data.data.arriveTime || time;
          document.getElementById("startWorkTime").innerText = `출근 시간: ${actualArriveTime}`;
          isWorking = true;
          document.getElementById("statusBadge").innerText = "근무중";
          aText.innerText = `출근 시간을 ${actualArriveTime}로 설정하였습니다.`; // 메시지 업데이트
          modal.style.display = "block"; // 모달창 표시
        } else {
          throw new Error("출근 처리 실패");
        }
      } catch (error) {
        console.error(error);
        aText.innerText = "출근 처리에 실패했습니다."; // 메시지 업데이트
        modal.style.display = "block"; // 모달창 표시
        document.getElementById("workToggle").checked = false;
      }
    } else {
      // 퇴근 처리
      const props2 = {
        userId: loginUser,
        leaveTime: time,
      };

      try {
        const modifyResult = await axios.post(
          `http://localhost:8080/api/commutes/leave`,
          props2
        );
        if (modifyResult.data.status === "success") {
          document.getElementById("endWorkTime").innerText = `퇴근 시간: ${time}`;
          isWorking = false;
          document.getElementById("statusBadge").innerText = "근무종료";
          aText.innerText = `퇴근 시간을 ${time}로 설정하였습니다.`; // 메시지 업데이트
          modal.style.display = "block"; // 모달창 표시
        } else {
          throw new Error("퇴근 처리 실패");
        }
      } catch (error) {
        console.error(error);
        aText.innerText = "퇴근 처리에 실패했습니다."; // 메시지 업데이트
        modal.style.display = "block"; // 모달창 표시
        document.getElementById("workToggle").checked = true;
      }
    }
  }

  document.getElementById("workToggle").addEventListener("change", toggleWork);

  function initialize() {
    document.getElementById("statusBadge").innerText = "근무 전";
    updateClock(); // 초기 시계 설정
    setInterval(updateClock, 1000); // 1초마다 시계 업데이트
  }

  initialize();
};

export default init;