import classNames from "classnames/bind";
import { placeholder } from "../../../constants/place-holder";
import styles from "./user-profile.module.css";

const cx = classNames.bind(styles);

const render = () => `
<section class="${cx("section")}">
    <button id="edit-btn" class="${cx("edit-btn")}">정보변경</button>
    <div class="${cx("profile-container")}">
    <!-- 프로필 -->
    </div>

    <!-- 모달 창 -->
    <div id="modal" class="${cx("modal")}">
        <div class="${cx("modal-content")}">
            <span class="${cx("close")}">&times;</span>

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
                <input type="password" id="modal-password">
            </div>
            <button id="modal-save" class="${cx("modal-save")}">Save</button>
        </div>
    </div>
</section>
`;

export default render;
