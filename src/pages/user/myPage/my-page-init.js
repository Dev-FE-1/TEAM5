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

  attends.slice(0, 4).forEach(({ type, startDate, endDate, content }) => {
    const typeClass = cx(type);


    const template = `
      <div class="${cx("attends-grid", "attends-item")}">
        <span class="${cx("badge", typeClass)}">${type}</span>
        <span>${startDate}</span>
        <span>${endDate}</span>
        <span>${content}</span>
      </div>
    `;
    attendsHtml += template;
  });

  console.log("attendsHtml", attendsHtml);

  document.querySelector(`.${cx("attends-content")}`).innerHTML = attendsHtml;

  // 출퇴근 상태 확인
  const statusResponse = await axios.get(`http://localhost:8080/api/commutes/status/${loginUser}`);
  const { commute, row } = statusResponse.data;

  const commuteData = {
    commute: commute,
    row: row,
  }


  // 출퇴근상태 api 재 호출
  const reloadCommuteData = async () => {
    const apiResult = await axios.get(`http://localhost:8080/api/commutes/status/${loginUser}`);
    if(apiResult?.status == '200') {
      commuteData.commute = apiResult.data?.commute;
      commuteData.row = apiResult.data?.row;
    }
  }

  let isWorking = false;

  /**
   * before - 출근전
   * ing - 근무중
   * after - 근무종료
   */
  if (commute === 'ing') {
    document.getElementById("workToggle").checked = true;
    document.getElementById("startWorkTime").innerText = `출근 시간: ${row.arriveTime}`;
    document.getElementById("statusBadge").innerText = "근무중";
    isWorking = true;
  } else if (commute === 'after') {
    document.getElementById("workToggle").checked = false;
    document.getElementById("workToggle").disabled = 'disabled';
    document.querySelector(`.${cx('slider')}`).classList.add(`${cx('disabled')}`);
    document.getElementById("startWorkTime").innerText = `출근 시간: ${row.arriveTime}`;
    document.getElementById("endWorkTime").innerText = `퇴근 시간: ${row.leaveTime}`;
    document.getElementById("statusBadge").innerText = "근무종료";
    isWorking = false;
  } else {
    document.getElementById("workToggle").checked = false;
    document.getElementById("statusBadge").innerText = "출근 전";
    isWorking = false;
  }
  
  

  // 모달
  const modal = document.querySelector(`.${cx("modal")}`);
  const confirmButton = document.getElementById("confirmButton");
  const cancelButton = document.getElementById("cancelButton");

  let workAction = null; // 출근/퇴근 액션 저장

  function updateClock({commute, row} = commuteData ) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const timer = document.getElementById('timer');
    if(commute == 'before' ) return;

    //          time1     time2
    // ing -> 현재시간 - 출근시간
    // after -> 퇴근시간 - 출근시간
    let time1 = 0;
    if(commute == 'ing') {
      time1 = hours * 3600 + minutes * 60 + seconds;
    } else if (commute == 'after') {
      const [lHour, lMin, lSec] = row.leaveTime?.split(':');
      time1 = Number(lHour) * 3600 + Number(lMin) * 60 + Number(lSec);
    }
    
    const [aHour, aMin, aSec] = row.arriveTime?.split(':');
    const time2 = Number(aHour) * 3600 + Number(aMin) * 60 + Number(aSec);

    // 계산된 시간 출력
    timer.innerText = formatTime(time1 - time2);
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

  async function handleWorkAction() {
    const now = new Date();
    const time =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0") +
      ":" +
      now.getSeconds().toString().padStart(2, "0");

    if (workAction === 'arrive') {
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
          await reloadCommuteData();
          setInterval(updateClock, 1000); // 1초마다 시계 업데이트
        } else {
          throw new Error("출근 처리 실패");
        }
      } catch (error) {
        console.error(error);
        document.getElementById("workToggle").checked = false;
      }
    } else if (workAction === 'leave') {
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
          await reloadCommuteData();
          clearInterval();
          document.querySelector(`.${cx('slider')}`).classList.add(`${cx('disabled')}`);
        } else {
          throw new Error("퇴근 처리 실패");
        }
      } catch (error) {
        console.error(error);
        alert("퇴근 처리에 실패했습니다.");
        document.getElementById("workToggle").checked = true;
      }
    }
  }

  document.getElementById("workToggle").addEventListener("change", (event) => {
    if (event.target.checked) {
      workAction = 'arrive';
      document.querySelector(`.${cx("a-text")}`).innerText = "근무를 시작하시겠습니까?";
    } else {
      workAction = 'leave';
      document.querySelector(`.${cx("a-text")}`).innerText = "근무를 종료하시겠습니까?";
    }
    modal.style.display = "block";
  });

  confirmButton.addEventListener("click", () => {
    modal.style.display = "none";
    handleWorkAction();
  });

  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
    document.getElementById("workToggle").checked = isWorking;
  });


  function initialize() {
    updateClock(); // 초기 시계 설정
    commute=='ing' && setInterval(updateClock, 1000); // 1초마다 시계 업데이트
  }

  initialize();
};

export default init;