import classNames from "classnames/bind";
import {
  deleteProfileImage,
  editProfileImage,
} from "../../../api/profile-imageAPI";
import { fetchUser } from "../../../api/userApi";
import { placeholder } from "../../../constants/place-holder";
import getUserId from "./getUserId";
import styles from "./user-profile.module.css";

const cx = classNames.bind(styles);

async function init() {
  const userId = getUserId();

  const render = async () => {
    const { imgUrl, name, team, position, email } = await fetchUser(userId);
    const template = `
      <div class="${cx("image-container")}">
          <img id="profile-picture" src="${
            imgUrl ?? placeholder
          }" alt="Profile Picture">
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
              <span class="${cx(
                "value"
              )}" id="profile-position">${position}</span>
          </div>
          <div class="${cx("info-item")}">
              <span class="${cx("label")}">이메일:</span>
              <span class="${cx("value")}" id="profile-email">${email}</span>
          </div>
      </div>
    `;

    const container = document.querySelector(`.${cx("profile-container")}`);

    container.innerHTML = template;

    // 모달 컨텐츠
    editBtn.onclick = function () {
      document.getElementById("modal-name").value = name;
      document.getElementById("modal-userId").value = userId;
      document.getElementById("modal-team").value = team;
      document.getElementById("modal-position").value = position;
      document.getElementById("modal-email").value = email;
      modalPreview.src = imgUrl ?? placeholder;
      modal.style.display = "block";
    };
  };

  render();

  // 모달
  const modal = document.getElementById("modal");
  const editBtn = document.getElementById("edit-btn");
  const span = document.querySelector(`.${cx("close")}`);
  const fileInput = document.getElementById("modal-image");
  const modalPreview = document.getElementById("modal-profile-picture");
  const deleteImageButton = document.getElementById("delete-image");

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
  deleteImageButton.onclick = async () => {
    const res = await deleteProfileImage(userId);
    alert(res.message);
    render();

    modal.style.display = "none";
  };

  document.getElementById("modal-save").onclick = async () => {
    const profileImage = fileInput.files[0];
    const formData = new FormData();
    formData.append("profile-image", profileImage);

    const res = await editProfileImage(userId, formData);
    alert(res.message);
    render();

    modal.style.display = "none";
  };
}

export default init;
