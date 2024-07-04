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

const routes = {
  //common
  "/": Home,
  "/login": Login,

  //admin
  "/admin/attend": Admin_Attend,
  "/admin/commute": Admin_Commute,
  "/admin/notice": Admin_Notice,
  "/admin/user-list": Admin_UserList,

  //user
  "/user/attend": User_Attend,
  "/user/my-page": User_MyPage,
};

async function router() {
  const path = window.location.pathname;
  const { render, init } = routes[path] ?? NotFound;

  root.innerHTML = path !== "/login" ? Layout(await render()) : render();

  if (init) {
    init();
  }
}

document.addEventListener("DOMContentLoaded", app);
