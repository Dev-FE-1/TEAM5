import axios from "/node_modules/axios/dist/esm/axios.min.js";

const HOST = "http://localhost:8080"; // 서버 주소


// 프로필
const 데이터 = await axios("http://localhost:8080/api/users/kimpra2989");

console.log("데이터", 데이터);

const name = 데이터.data.data.name;
const team = 데이터.data.data.team;
const position = 데이터.data.data.position;
const email = 데이터.data.data.email;
const userId = 데이터.data.data.userId;
const imgUrl = 데이터.data.data.imgUrl;

document.getElementById("name").textContent = name;
document.getElementById("team").textContent = team;
document.getElementById("position").textContent = position;
document.getElementById("email").textContent = email;
document.getElementById("userId").textContent = userId;

// console.log(imgUrl)

document.getElementById("profile-image").setAttribute("src", imgUrl);


// 공지사항

const noticesResponse = await axios("http://localhost:8080/api/notices");

const placeholder = "https://via.placeholder.com/100";

let noticesHtml = ""; // 템플릿을 저장할 변수

const notices = noticesResponse.data.data;
console.log('Notices', notices);

notices.slice(0, 3).forEach(({ imgUrl, subject, content, date }) => {
    const template = `
        <div class="notices-item">
            <img class="notices-image" 
                src=${imgUrl ?? placeholder} 
                alt="이미지"
                />
            <div class="notice-text">
                <p class="subject">${subject}</p>
                <p class="content">${content}</p>
                <p class="date">${date}</p>
            </div>
        </div>
      `;
      noticesHtml += template;
    });

    document.querySelector(".notices-content").innerHTML = noticesHtml;





// 근태사항
const attendssResponse = await axios("http://localhost:8080/api/attends");

let attendsHtml = ""; // 템플릿을 저장할 변수

const attends = attendssResponse.data.data;
console.log('attends', attends);

attends.slice(0, 4).forEach(({ type, startDate, endDate,content, userId }) => {
    const template = `
        <div class="attends-item">
            <span class="badge">${type}</span>
            <span>${startDate}</span>
            <span>${endDate}</span>
            <span>${content}</span>
            <span>${userId}</span>
        </div>
    `;
    attendsHtml += template;
});

console.log('attendsHtml', attendsHtml)

document.querySelector(".attends-content").innerHTML = attendsHtml;





// 모달
const modal = document.querySelector('.modal');
    const btnOpenModal=document.querySelector('.open-modal-btn');
    const btnCloseModal=document.querySelector('.close-modal-btn')

    btnOpenModal.addEventListener("click", ()=>{
        modal.style.display="block";    
    });
    btnCloseModal.addEventListener("click", ()=>{
        modal.style.display="none";    
    });




    // 출퇴근
let isWorking = false; // 근무 상태를 나타내는 변수

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    document.getElementById('timer').innerText = formatTime(hours * 3600 + minutes * 60 + seconds);
}

// 시간을 형식화하는 함수
function formatTime(sec) {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startWork() {
    if (!isWorking) {
        isWorking = true; // 근무 상태로 변경
        document.getElementById('workToggle').checked = true; // 토글 버튼 켜기
        document.getElementById('statusBadge').innerText = '근무중'; // 상태 배지 변경
    }
}

function endWork() {
    if (isWorking) {
        isWorking = false; // 근무 상태 해제
        document.getElementById('workToggle').checked = false; // 토글 버튼 끄기
        document.getElementById('statusBadge').innerText = '근무종료'; // 상태 배지 변경
    }
}

document.getElementById('startButton').addEventListener('click', startWork); // 근무 시작 버튼 클릭 이벤트 리스너 추가
document.getElementById('endButton').addEventListener('click', endWork); // 근무 종료 버튼 클릭 이벤트 리스너 추가

// 페이지 로드 시 초기 상태 설정
// document.addEventListener('DOMContentLoaded', (event) => {
function initialize() {
    document.getElementById('statusBadge').innerText = '근무 전'; // 초기 상태 배지 설정
    updateClock(); // 초기 시계 설정
    setInterval(updateClock, 1000); // 1초마다 시계 업데이트
};


initialize();
