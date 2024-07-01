import "./styles/reset.css";
import "./styles/variables.css";
import {
  Admin_Attend,
  Admin_Commute,
  Admin_Notice,
  Admin_UserList,
  Home,
  Login,
  NotFound,
  User_Attend,
  User_MyPage,
} from "./pages";
import { Layout } from "./components";

const app = () => {
  init();
  router();
};

const root = document.querySelector("#root");

const init = () => {
  window.addEventListener("popstate", router);
};

const router = async () => {
  const routes = {
    "/": Home,

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

  root.innerHTML = path !== "/login" ? Layout(await render()) : render();
};

document.addEventListener("DOMContentLoaded", app);
