import { findOne, modify, remove } from "../api";
import Layout from "../layouts/Layout";
import { reRender } from "../main";

const createModal = (prop) => {
  return `
  <div class="modal-container">
    <div class="modifyForm">
      <div class="closeBtn icon closeIcon"></div>
      <h2>근태 상세조회</h2>
      <input type='hidden' id='attendId'/>
      <input type="hidden" id="userId" />
      <div class="formItem able-item item2">
        <span>구분</span>
        <select id="modal-type">
          <option value='연차'>연차</option>
          <option value='반차'>반차</option>
          <option value='조퇴'>조퇴</option>
        </select>
      </div>
      <div class="formItem able-item item4">
        <span>일시</span>
        <input type="date" placeholder="yyyy-mm-dd" id="modal-startDate" /> ~
        <input type="date" placeholder="yyyy-mm-dd" id="modal-endDate" />
      </div>
      <div class="formItem item2">
        <span>사원명</span>
        <span id="modal-userId"></span>
      </div>
      <div class="formItem item2">
        <span >제목</span>
        <span id="modal-subject"></span>
      </div>
      <div class="formItem item2">
        <span >내용</span>
        <span id="modal-content"></span>
      </div>
      <div class="btnWrap">
        <button type="button" class="modalBtn modifyBtn"><div class="icon modifyIcon"></div>수정</button>
      </div>
    </div>
  </div>
  `;
}

export const addModalEvent = () => {
  const closeBtn = document.querySelector('.closeBtn').addEventListener('click', closeModal);

  const modalModifyBtn = document.querySelector('.modifyBtn').addEventListener('click', modifyAttend);
}

export const setModifyData = ({data: attendData, obj: container}) => {
  container.querySelector('#attendId').value = attendData.id;
  container.querySelector(`#modal-type`).value = attendData.type;
  container.querySelector('#modal-startDate').value = attendData.startDate;
  container.querySelector('#modal-endDate').value = attendData.endDate;
  container.querySelector('#modal-userId').innerText = attendData.userId;
  container.querySelector('#modal-subject').innerText = attendData.subject;
  container.querySelector('#modal-content').innerText = attendData.content;
}

const reloadLayout = async (type) => {
  document.querySelector(`.main-content`).innerHTML = await Layout(type);
  addModalEvent();
}

export const closeModal = (event) => {
  document.querySelector('.modal-container').classList.remove('appear');
  document.querySelector('.modal-container').classList.add('disappear');
}

export const modifyAttend = async (event) => {
  const container = document.querySelector('.modal-container');

  const props = {
    attendId: container.querySelector('#attendId').value,
    type: container.querySelector(`#modal-type`).value,
    startDate: container.querySelector('#modal-startDate').value,
    endDate: container.querySelector('#modal-endDate').value,
    userId: container.querySelector('#modal-userId').innerText,
    subject: container.querySelector('#modal-subject').innerText,
    content: container.querySelector('#modal-content').innerText,
  }

  const apiResult = await modify(props);

  if(apiResult.status === "UPDATE") {
    closeModal();
    reRender();
  }
}

export default function Modal() {
  return createModal();
}