import axios from "/node_modules/axios/dist/esm/axios.min.js";


` 반복문을 활용해서 전체 데이터 처리해보기 

  ※ 사전 준비 ※
    index.html에서 <script src="step1.js" type="module"></script>를 step1 => step2로 바꿉시다.

  1. 이제 모든 데이터를 처리하는 방법에 대해 살펴봅시다.
  2. step1에서 만든 템플릿 문자열을 각 데이터마다 반복하여 생성한 후, 하나로 합쳐서 html 요소 안쪽에 넣으면 되겠죠?
  3. 비숫한 작업을 반복할 때는 반복문을 사용합니다.
     반복문에는 for, for of, for in, forEach 등 여러가지가 있지만, 이번에는 forEach로 해보겠습니다.
     forEach는 배열에 붙여 배열.forEach((배열의 원소, 인덱스) => { 실행할 내용 })과 같이 사용합니다.
      배열의 원소 부분에는 배열의 원소가 앞에서 부터 차례로 들어옵니다. 
        [1,2,3,4].forEach((a, i)) 하면 배열의 원소(a)에는 1,2,3,4가 차례로 할당되고, i에는 0부터 증가하는 정수가 할당됩니다.
  4. 실행할 내용 부분에 step1에서 했던 것(하나의 데이터에 대해 html 템플릿 만들기)을 집어넣으면 됩니다. 
     다만, 이번에는 각 데이터에 대한 html 템플릿을 하나로 합쳐서 index.html에 넣을 예정이니, 템플릿을 담을 변수하나를 만들어둡시다.
  5. 완성한 템플릿을 index.html의 <div class="grid request-item" id="request-item"></div> 안쪽에 넣습니다.
`
const 응답 = await axios("http://localhost:8080/api/users");

// 이미지가 없을 때(imgUrl == null) 자리 채울 이미지
const placeholder = "https://via.placeholder.com/100";

let html = ""; // 템플릿를 저장할 변수

const 데이터배열 = 응답.data.data; // [ { 데이터1 }, { 데이터2 }, {데이터3}, .... ]

// 3. 반복문으로 각 데이터 처리하기
데이터배열.forEach(({ imgUrl, name, userId, team, position, email }) => { // 배열의 원소가 { userId: "kimpra2989", name: "Kim Pra" }와 같은 형태임
  // 4. 변수를 받고 템플릿 생성
  const template = `
    <img
      class="profile-image"
      src=${imgUrl ?? placeholder}
      alt="이미지"
      />  
    <div>
      <span class="name">${name}</span>
    </div>
    <div>
      <span class="userId">${userId}</span>
    </div>
    <div class="team">${team}</div>
    <div class="position">${position}</div>
    <div class="email">${email}</div>
  `;
  // 변수에 추가하기
  html += template;
});

// 5. index.html에 할당
document.getElementById("request-item").innerHTML = html;
