import classNames from "classnames/bind";
import { login } from "../../api/loginApi";
import styles from "./login.module.css";

const cx = classNames.bind(styles);

const init = () => {
  const idInput = document.getElementById("id");
  const pwInput = document.getElementById("pw");
  const loginButton = document.querySelector(`.${cx("btn-area")} button`);
  const loginForm = document.getElementById("login-form");

  idInput.addEventListener("input", updateButtonState);
  pwInput.addEventListener("input", updateButtonState);

  function updateButtonState() {
    if (idInput.value && pwInput.value) {
      loginButton.disabled = false;
      loginButton.style.backgroundColor = "#6d40c8";
      loginButton.style.cursor = "pointer";
    } else {
      loginButton.disabled = true;
      loginButton.style.backgroundColor = "#999";
      loginButton.style.cursor = "default";
    }
  }

  updateButtonState();

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userId = idInput.value;
    const password = pwInput.value;

    const response = await login({ userId, password });

    if (response.status == "error") {
      alert(response.message);
      return;
    }

    // 로그인 정보 처리
    localStorage.setItem('loginUser',response.userId)
    localStorage.setItem('profileImage',response.imgUrl)

    window.location.href = response.isAdmin ? "/admin/users" : "/user/my-page";
  });
};

export default init;
