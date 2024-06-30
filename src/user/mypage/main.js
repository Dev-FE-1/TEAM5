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


