import { Layout } from "../components";
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
} from "../pages";

async function router() {
  const path = window.location.pathname;
  const { render, init } = routes[path] ?? NotFound;

  root.innerHTML = path !== "/login" ? Layout(await render()) : render();

  if (init) {
    init();
  }
}

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

export default router;
