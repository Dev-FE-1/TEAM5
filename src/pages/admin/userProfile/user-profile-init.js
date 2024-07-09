import classNames from "classnames/bind";
import { fetchUser } from "../../../api/userApi";
import getUserId from "./getUserId";
import styles from "./user-profile.module.css";

const cx = classNames.bind(styles);

async function init() {
  const userId = getUserId();
  const { imgUrl, name, team, position, email } = await fetchUser(userId);
  const placeholder = "https://via.placeholder.com/250x300";
  const template = `
    <div class="${cx("image-container")}">
        <img id="profile-picture" src="${imgUrl ?? placeholder}" alt="Profile Picture">
    </div>
    <div class="${cx("info")}">
        <div class="${cx("info-item")}">
            <span class="${cx("label")}">이름:</span>
            <span class="${cx("value")}" id="profile-name">${name}</span>
        </div>
        <div class="${cx("info-item")}">
            <span class="${cx("label")}">사번:</span>
            <span class="${cx("value")}" id="profile-userId">${userId}</span>
        </div>
        <div class="${cx("info-item")}">
            <span class="${cx("label")}">팀:</span>
            <span class="${cx("value")}" id="profile-team">${team}</span>
        </div>
        <div class="${cx("info-item")}">
            <span class="${cx("label")}">직급:</span>
            <span class="${cx("value")}" id="profile-position">${position}</span>
        </div>
        <div class="${cx("info-item")}">
            <span class="${cx("label")}">이메일:</span>
            <span class="${cx("value")}" id="profile-email">${email}</span>
        </div>
    </div>
  `;

  const container = document.querySelector(`.${cx("profile-container")}`);

  container.innerHTML = template;

  // 모달
  const modal = document.getElementById("modal");
  const editBtn = document.getElementById("edit-btn");
  const span = document.querySelector(`.${cx("close")}`);
  const fileInput = document.getElementById("modal-image");
  const modalPreview = document.getElementById("modal-profile-picture");
  const deleteImageButton = document.getElementById("delete-image");

  editBtn.onclick = function () {
    document.getElementById("modal-name").value = name;
    document.getElementById("modal-userId").value = userId;
    document.getElementById("modal-team").value = team;
    document.getElementById("modal-position").value = position;
    document.getElementById("modal-email").value = email;
    modalPreview.src = imgUrl ?? placeholder;
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  modalPreview.onclick = () => {
    fileInput.click();
  };

  // 이미지 업로드 시 미리보기 업데이트
  fileInput.addEventListener("change", function () {
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        modalPreview.src = e.target.result;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  });

  // 이미지 삭제 기능 추가
  deleteImageButton.addEventListener("click", function () {
    modalPreview.src = "https://via.placeholder.com/100";
    fileInput.value = ""; // 파일 입력 초기화
  });

  document.getElementById("modal-save").onclick = async () => {
    const profileImage = fileInput.files[0];
    console.log(profileImage);
    const formData = new FormData();
    formData.append("profile-image", profileImage);

    const res = await fetch(
      `http://localhost:8080/api/users/${userId}/profile-image`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!res.ok) {
      console.log("not ok");
      const responses = await res.json();
      console.error("Error:", responses.message);
      console.log("res", responses);
      alert("error : " + responses.message);
      return;
    }

    const resjson = await res.json();
    console.log(resjson);
    alert(resjson.message);

    modal.style.display = "none";
  };
}

export default init;
