// import './styles/reset.css'
import "./styles/variables.css";
import {
  Admin_Attend,
  Admin_Commute,
  Admin_Notice,
  Admin_UserList,
  Login,
  NotFound,
  User_Attend,
  User_MyPage,
} from "./pages";

const app = () => {
  init();
  router();
};

const root = document.querySelector("#root");

const init = () => {
  window.addEventListener("popstate", router);
  // document.body.addEventListener("click", navigatePage);
};

// const navigatePage = (event) => {
//   event.preventDefault();

//   const path = event.target.getAttribute("href");
//   const anchor = event.target.closest("a");

//   if (anchor && anchor.href) {
//     history.pushState(null, null, anchor.href);
//     route();
//   }
// };

function router() {
  const routes = {
    "/": () => "<h1>Home</h1>",
    "/admin/attend": Admin_Attend,
    "/admin/commute": Admin_Commute,
    "/admin/notice": Admin_Notice,
    "/admin/user-list": Admin_UserList,

    "/user/attend": User_Attend,
    "/user/my-page": User_MyPage,

    "/login": Login,
  };

  const path = window.location.pathname;
  const render = routes[path] ?? NotFound;

  document.getElementById("root").innerHTML = render();
}

document.addEventListener("DOMContentLoaded", app);
