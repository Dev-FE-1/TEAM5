import classNames from "classnames/bind";
import styles from "./user-list.module.css";

const cx = classNames.bind(styles);

const render = () => `
<section class="${cx("section")}">
    <!-- 검색창 -->
    <div class="${cx("search-container")}">
        <input type="text" id="search" placeholder="검색어를 입력하세요...">
        <button id="search-button">
            <span class="material-icons">search</span>
        </button>
    </div>
    <!-- 프로필카드 전체 박스 -->
    <div class="${cx("container")}" id="profile-container">
        <div class="${cx("profile-card", "plus-box")}" id="add-profile-card">
            <span class="material-icons">add</span>
        </div>
    </div>
    <div class="${cx("pagination")}">
        <button id="prevPage" disabled>Previous</button>
        <span id="pageNumber">1</span>
        <button id="nextPage">Next</button>
    </div>

    <!-- 모달 창 -->
    <div id="modal" class="${cx("modal")}">
        <div class="${cx("modal-content")}">
            <span class="close">&times;</span>
            <h2>새 프로필 추가</h2>
            <div class="${cx("info-item")}">
                <label for="modal-name">이름:</label>
                <input type="text" id="modal-name">
            </div>
            <div class="${cx("info-item")}">
                <label for="modal-id">사번:</label>
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
            <div class="${cx("info-item")}">
                <label for="modal-image">이미지 첨부:</label>
                <input type="file" id="modal-image" accept="image/*">
            </div>
            <button id="modal-save">Save</button>
        </div>
    </div>

    <script src="../list/list.js" type="module"></script>
</section>
`;

export default render;
