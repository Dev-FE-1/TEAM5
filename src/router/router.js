import { Layout } from "../components";
import {
  Admin_Attend,
  Admin_Commute,
  Admin_Notice,
  Admin_UserList,
  Admin_UserProfile,
  Home,
  Login,
  NotFound,
  User_Attend,
  User_Commute,
  User_MyPage,
} from "../pages";

async function router() {
  let path = window.location.pathname;

  let props = {};

  // 뭐든간에 쿼리스트링으로 넘길때? param 처리
  if(path.includes('users') && path.substring(path.lastIndexOf('/')+1) !== 'users' ) {
    props = {
      param: path.substring(path.lastIndexOf('/')+1),
    }
    path = path.substring(0, path.lastIndexOf('/')+1);
  }

  const { render, init } = routes[path] ?? NotFound;

  root.innerHTML = path !== "/login" ? Layout(await render()) : render();

  if (init) {
    init(props?.param);
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
  "/admin/users": Admin_UserList,
  "/admin/users/profile/": Admin_UserProfile,

  //user
  "/user/attend": User_Attend,
  "/user/commute": User_Commute,
  "/user/my-page": User_MyPage,
};

export default router;
