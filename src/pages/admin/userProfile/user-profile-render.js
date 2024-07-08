import classNames from "classnames/bind";
import styles from "./user-profile.module.css";

const cx = classNames.bind(styles);

const render = () => `
<section class="${cx("section")}">
    <div class="${cx("details")}">임직원 상세</div>

    <div class="${cx("save-button-container")}">
        <button id="edit-btn" class="${cx("edit-btn")}">정보변경</button>
    </div>
    <div class="${cx("profile-container")}">
        <div class="${cx("image-container")}">
            <img id="profile-picture" src="https://via.placeholder.com/250x300" alt="Profile Picture">
        </div>
        <div class="${cx("info")}">
            <div class="${cx("info-item")}">
                <span class="${cx("label")}">이름:</span>
                <span class="${cx("value")}" id="profile-name"></span>
            </div>
            <div class="${cx("info-item")}">
                <span class="${cx("label")}">사번:</span>
                <span class="${cx("value")}" id="profile-userId"></span>
            </div>
            <div class="${cx("info-item")}">
                <span class="${cx("label")}">팀:</span>
                <span class="${cx("value")}" id="profile-team"></span>
            </div>
            <div class="${cx("info-item")}">
                <span class="${cx("label")}">직급:</span>
                <span class="${cx("value")}" id="profile-position"></span>
            </div>
            <div class="${cx("info-item")}">
                <span class="${cx("label")}">이메일:</span>
                <span class="${cx("value")}" id="profile-email"></span>
            </div>
        </div>
    </div>

    <!-- 모달 창 -->
    <div id="modal" class="${cx("modal")}">
        <div class="${cx("modal-content")}">
            <span class="${cx("close")}">&times;</span>
            <h2>정보 변경</h2>
            <div class="${cx("image-container")}">
                <img id="modal-profile-picture" src="https://via.placeholder.com/100" alt="Profile Picture">
                <div class="${cx("button-container")}">
                    <input type="file" id="modal-image" accept="image/*">
                    <button id="delete-image" class="${cx("delete-image")}">삭제</button>
                </div>
            </div>
            <div class="${cx("info-item")}">
                <label for="modal-name">이름:</label>
                <input type="text" id="modal-name">
            </div>
            <div class="${cx("info-item")}">
                <label for="modal-userId">사번:</label>
                <input type="text" id="modal-userId">
            </div>
            <div class="${cx("info-item")}">
                <label for="modal-team">팀:</label>
                <input type="text" id="modal-team">
            </div>
            <div class="${cx("info-item")}">
                <label for="modal-position">직급:</label>
                <input type="text" id="modal-position">
            </div>
            <div class="${cx("info-item")}">
                <label for="modal-email">이메일:</label>
                <input type="text" id="modal-email">
            </div>
            <div class="${cx("info-item")}">
                <label for="modal-password">비밀번호:</label>
                <input type="text" id="modal-password">
            </div>
            <button id="modal-save" class="${cx("modal-save")}">Save</button>
        </div>
    </div>

    <script src="../profile/profile.js"></script>
</section>
`;

export default render;
