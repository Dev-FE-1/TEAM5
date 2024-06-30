import axios from "/node_modules/axios/dist/esm/axios.min.js";

` html을 문자열로 만들고 js로 집어넣어보기

  ※ 사전 준비 ※
    데이터 최신화   
      1. 기존 데이터(toyprj1.db)를 지우고
      2.  터미널에서 npm run server
      3. 새로운 터미널에서 npm run db:mock 

  1. 모든 유저 데이터를 가져오기 위해서 axios로 "http://localhost:8080/api/users"에 요청을 보냅니다.
    ※ npm run server를 통해 서버를 켜야 요청이 됩니다.
    ex. const 응답 = await axios("http://localhost:8080/api/users")
  2. 가져온 데이터를 console에 찍어 데이터 구조를 확인해봅시다.
  3. 우리가 쓰려고 하는 데이터는 응답.data.data 있습니다. 이번에는 배열에 객체가 있는 구조네요.
      즉, 응답.data.data = [ { 데이터 }, { 데이터2 }, {데이터3}, .... ] 입니다.
     배열에 각 데이터는 지난 번에 쓴 객체입니다.
     ---------------------------------------------------------------------
     * 데이터 예시 *
     {
      userId: "kimpra2989",
      email: "kimpra2989@example.com",
      name: "Kim Pra",
      team: "Marketing",
      position: "Manager",
      isAdmin: 0, 
      imgUrl: "https://avatars.githubusercontent.com/u/106394183?v=4",
    };
    -----------------------------------------------------------------------

  4. 지난 번처럼 저 데이터를 html에 꽂아 넣으면 되겠죠? 문제는 서버에서 데이터가 몇 개 올 지 모른다는 점입니다.
     그래서 지난 번처럼 미리 만들어진 html에 데이터를 꽂아 놓는(바인딩하는) 방식이 아닌, 
     js로 데이터 개수만큼 html요소를 만들고, 만든 요소를 html 내부에 집어놓는 방식으로 처리합니다.
  5. 우선은 하나의 데이터로 html요소를 만들어보는 연습을 해봅시다. 
     const 데이터 = 응답.data.data[0]  => 위 데이터 예시와 같은 형식의 데이터
     ※ 객체의 속성 값을 변수로 받을 때, 변수명을 객체의 속성명과 똑같이 설정하면 쉽게 데이터를 받아올 수 있습니다.
        자주 쓰는 방식이니 익혀둡시다. 
        ex. const { imgUrl, name, userId } = 데이터;
            => 데이터 데이터.imgUrl이 imgUrl 변수에, 데이터.name이 name변수에 할당됩니다. 
  7. html을 문자열로 만들고 그 안에 변수들을 넣어봅시다. 
     백틱(물결 ~ shift 없이 치면 나오는 거)을 이용해 문자열을 만들면 문자열 내부에서 변수를 쓸 수 있습니다. 
     밑에서 예시를 살펴봅시다.
  8. 데이터로 부터 가져온 변수를 html 템플릿 문자열에 넣고 html을 완성합니다.
  9. 완성한 템플릿을 index.html의 <div class="grid request-item" id="request-item"></div> 안쪽에 넣습니다.
     ex.document.getElementById("request-item").innerHTML = template;
  10. 템플릿 내부의 사번, 팀, 직급, 이메일 부분을 비워뒀습니다. 데이터로부터 변수로 받고 템플릿에 할당해봅시다.
      사번, 팀, 직급, 이메일이 서버에서 받아온 데이터로 표시되면 성공입니다. 
`;

// 1. 서버에 요청 보내기
const 응답 = await axios("http://localhost:8080/api/users");

// 2. 가져온 데이터 확인하기
console.log(응답.data.data);

// 6. 하나의 데이터로 해보기
const 데이터 = 응답.data.data[0];

const { imgUrl, name, userId } = 데이터;
console.log("imgUrl : ", imgUrl, "name : ", name, "userId : ", userId);

// 이미지가 없을 때(imgUrl == null) 자리 채울 이미지
const placeholder = "https://via.placeholder.com/100";

// 7. 백틱으로 문자열 내부에 변수 만들기 => 백틱(`) 안쪽에 ${변수}를 하면 문자열에 변수를 넣을 수 있습니다.
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
  <span class="userId">사번</span>
</div>
<div class="team">팀</div>
<div class="position">직급</div>
<div class="email">이메일</div>
`;

// 8. div 안쪽에 html 집어넣기
document.getElementById("request-item").innerHTML = template;
