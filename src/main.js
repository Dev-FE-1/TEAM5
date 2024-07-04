import router from "./router/router";
import "./styles/reset.css";
import "./styles/variables.css";

const app = () => {
  init();
  router();
};

const root = document.querySelector("#root");

const init = () => {
  window.addEventListener("popstate", router);
};

document.addEventListener("DOMContentLoaded", app);
