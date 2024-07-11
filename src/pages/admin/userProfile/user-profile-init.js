import classNames from "classnames/bind";
import {
  deleteProfileImage,
  editProfileImage,
} from "../../../api/profile-imageAPI";
import { editUserInfo, fetchUser } from "../../../api/userApi";
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
      <div class="${cx("button-container")}">
          <input type="file" id="file-input" accept="image/*">
          <button id="delete-image" class="${cx(
            "button",
            "btn-delete"
          )}">이미지 삭제</button>
          <button id="edit-image" class="${cx(
            "button",
            "btn-edit"
          )}">이미지 수정</button>
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
      modal.style.display = "block";
    };

    const profileImage = document.getElementById("profile-picture");
    const fileInput = document.getElementById("file-input");
    const deleteImageButton = document.getElementById("delete-image");
    const editImageButton = document.getElementById("edit-image");

    profileImage.onclick = () => {
      fileInput.click();
    };

    // 이미지 업로드 시 미리보기 업데이트
    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profileImage.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    });

    // 이미지 삭제 기능 추가
    deleteImageButton.onclick = async () => {
      if (!confirm("정말 삭제하시겠습니까?")) return;

      const res = await deleteProfileImage(userId);
      alert(res.message);
      render();

      modal.style.display = "none";
    };

    editImageButton.onclick = async () => {
      const profileImage = fileInput.files[0];
      const formData = new FormData();
      formData.append("profile-image", profileImage);

      const res = await editProfileImage(userId, formData);
      alert(res.message);
      render();

      modal.style.display = "none";
    };
  };

  render();

  // 모달
  const modal = document.getElementById("modal");
  const editBtn = document.getElementById("edit-btn");
  const span = document.querySelector(`.${cx("close")}`);
  const save = document.getElementById("modal-save");

  save.onclick = async () => {
    const name = document.getElementById("modal-name")?.value;
    const userId = document.getElementById("modal-userId")?.value;
    const team = document.getElementById("modal-team")?.value;
    const position = document.getElementById("modal-position")?.value;
    const email = document.getElementById("modal-email")?.value;
    const password = document.getElementById("modal-password")?.value;

    const res = await editUserInfo(userId, {
      name,
      userId,
      team,
      position,
      email,
      password,
    });
    console.log(res)
    alert(res.message);
    modal.style.display = "none";
    render();
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

export default init;
