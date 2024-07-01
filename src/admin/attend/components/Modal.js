
const createModal = () => {
  return `
  <div class="modal-container">
    <div class="modifyForm">
      <div class="closeBtn icon closeIcon"></div>
      <h2>근태 상세조회</h2>
      <input type="hidden" id="userId" />
      <div class="formItem able-item item2">
        <span>구분</span>
        <select>
          <option>연차</option>
          <option>반차</option>
          <option>조퇴</option>
        </select>
      </div>
      <div class="formItem able-item item4">
        <span>일시</span>
        <input type="text" placeholder="yyyy-mm-dd" id="startDate" /> ~
        <input type="text" placeholder="yyyy-mm-dd" id="endDate" />
      </div>
      <div class="formItem item2">
        <span>사원명</span>
        <span id="text_userId">테스트사원</span>
      </div>
      <div class="formItem item2">
        <span >제목</span>
        <span id="text_subject">휴가신청해요</span>
      </div>
      <div class="formItem item2">
        <span >내용</span>
        <span id="text_content">가고싶어</span>
      </div>
      <div class="btnWrap">
        <button type="button" class="modalBtn modifyBtn"><div class="icon modifyIcon"></div>수정</button>
        <button type="button" class="modalBtn deleteBtn"><div class="icon deleteIcon"></div>삭제</button>
      </div>
    </div>
  </div>
  `;
}

const setModifyData = (data) => {
}

export const openModal = (event) => {
  // console.log('openModal', );
  const id = event.target.closest('div.list-item').querySelector('.attendId').value;
  
}

export const deleteAttend = (data) => {
  console.log('deleteAttend', data);
}

export default function Modal() {
  return createModal();
}