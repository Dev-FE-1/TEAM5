import { findAll, findOne, modify, remove } from "../../../api/attendApi";
import styles from "./attend.module.css";
import classNames from "classnames/bind";
import { close_icon, delete_icon, edit_icon } from "../../../assets/icons";

const cx = classNames.bind(styles);

const SELECTOR = {
  listDiv: "request-item",
  paginationDiv: "pagination",
};


const LIST_PROPS = {
  data: null,
  type: '',
  curPage: 1,
  curDataLength: 0,
}

let pageProps = LIST_PROPS;

export const init = () => {

  /* -------------함수 정의 --------------*/
  /**
   * 재 렌더링
   */
  const reRender = async ({data, type, curPage} = LIST_PROPS) => {
    
    const listDiv = document.querySelector(`.${cx(SELECTOR.listDiv)}`);
    listDiv.innerHTML = await renderList(data, type, curPage);
    
    const paginationDiv = document.querySelector(`.${cx(SELECTOR.paginationDiv)}`);
    paginationDiv.innerHTML = renderPagination();

    addListEvent();
  };

  /**
   * addEventListener
   * @check 
   * 리스트 수정버튼  click
   * 리스트 삭제버튼  click
   * 모달 수정버튼    click
   * 리스트 타입      change
   */
  const addListEvent = () => {
    // 수정 버튼(open modal)
    document.querySelectorAll(`.${cx("btn-modify")}`).forEach(item => item.addEventListener('click', openModal));

    // 삭제 버튼
    document.querySelectorAll(`.${cx("btn-delete")}`).forEach(item => item.addEventListener("click", deleteAttend));

    document.querySelector("#searchType").addEventListener("change", chgType);

    document.querySelectorAll(`.${cx("pageNum")}`).forEach( item => item.addEventListener("click", chgPage));
  };

  /* 버튼동작 */
  const deleteAttend = async (event) => {
    const id = event.target
      .closest(`div.${cx("list-item")}`)
      .querySelector(`.${cx("attendId")}`).value;

    const apiResult = await remove({ attendId: id });

    // @check 리로드 해
    if (apiResult?.status === "DELETE") reRender(pageProps);
    // reRender(pageProps);
  };

  const chgType = (event) => {
    const curType = event.target.value;

    pageProps = {
      ...pageProps,
      type: curType,
      curPage: 1
    }

    reRender( pageProps );
  };

  const chgPage = (event) => {
    const curPage = event.target.innerText;
    pageProps = {
      ...pageProps,
      curPage: curPage
    }
    reRender( pageProps );
  };

  const renderPagination = () => {
    const totalPageNum = Math.ceil(pageProps.curDataLength / 10);

    const pagination = [];
    for(let i = 1; i <= totalPageNum; i++) {
      pagination.push(`<div class='${cx('pageNum', i == pageProps?.curPage && 'curPage')}'>${i}</div>`);
    }

    return pagination.join('');
  }

  const openModal = async (event) => {
    const modalContainer = document.querySelector(`.${cx('modal-container')}`);
    modalContainer.innerHTML = renderModal();

    const id = event.target.closest(`div.${cx('list-item')}`).querySelector(`.${cx('attendId')}`).value;
  
    modalContainer.classList.remove(`${cx('disappear')}`);
    modalContainer.classList.add(`${cx('appear')}`);
  
    const {status, data} = await findOne({attendId: id});
    if(status === 'OK') setModifyData({data: data, obj: modalContainer});

    addModalEvent();
  }

  const renderModal = () => {
    return `
        <div class="${cx("modifyForm")}">
          <div class="${cx("closeBtn", "icon")}">
            ${close_icon({color: 'black', size: '24px'})}
          </div>
          <h2>근태 상세조회</h2>
          <input type='hidden' id='attendId'/>
          <input type="hidden" id="userId" />
          <div class="${cx("formItem", "able-item", "item2")}">
            <span>구분</span>
            <select id="modal-type">
              <option value='연차'>연차</option>
              <option value='반차'>반차</option>
              <option value='조퇴'>조퇴</option>
            </select>
          </div>
          <div class="${cx("formItem", "able-item", "item4")}">
            <span>일시</span>
            <input type="date" placeholder="yyyy-mm-dd" id="modal-startDate" /> ~
            <input type="date" placeholder="yyyy-mm-dd" id="modal-endDate" />
          </div>
          <div class="${cx("formItem", "item2")}">
            <span>사원명</span>
            <span id="modal-userId"></span>
          </div>
          <div class="${cx("formItem", "item2")}">
            <span >제목</span>
            <span id="modal-subject"></span>
          </div>
          <div class="${cx("formItem", "item2")}">
            <span >내용</span>
            <span id="modal-content"></span>
          </div>
          <div class="${cx("btnWrap")}">
            <button type="button" class="${cx(
              "modalBtn",
              "modifyBtn"
            )}">${edit_icon()}수정</button>
          </div>
      </div>`;
  }

  const removeModal = (modalContainer) => {
    modalContainer.innerHTML = '';
  }

  const addModalEvent = () => {
    const closeBtn = document.querySelector(`.${cx('closeBtn')}`).addEventListener('click', closeModal);
  
    const modalModifyBtn = document.querySelector(`.${cx('modifyBtn')}`).addEventListener('click', modifyAttend);
  }

  const setModifyData = ({data: attendData, obj: container}) => {
    container.querySelector(`#attendId`).value = attendData.id;
    container.querySelector(`#modal-type`).value = attendData.type;
    container.querySelector(`#modal-startDate`).value = attendData.startDate;
    container.querySelector(`#modal-endDate`).value = attendData.endDate;
    container.querySelector(`#modal-userId`).innerText = attendData.userId;
    container.querySelector(`#modal-subject`).innerText = attendData.subject;
    container.querySelector(`#modal-content`).innerText = attendData.content;
  }

  const closeModal = (event) => {
    const container = document.querySelector(`.${cx('modal-container')}`);
    container.classList.remove(`${cx('appear')}`);
    container.classList.add(`${cx('disappear')}`);

    removeModal(container);
  }
  
  const modifyAttend = async (event) => {
    const container = document.querySelector(`.${cx('modal-container')}`);
  
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
      reRender(pageProps);
    }
  }

  reRender(pageProps);
};

/**
   * 리스트 render
   */
export const renderList = async (data = null, type = '', curPage = 1) => {
  let renderData = data;
  if(!!!renderData) {
    const {data: findAllData} = await findAll();
    renderData = findAllData;
  }

  // 타입검색
  !!type && (renderData = await renderData.filter(item => item.type==`${type}`));

  pageProps = {
    ...pageProps,
    curDataLength: renderData.length,
  }
  // 페이지네이션
  renderData = await renderData.filter((_, index) => index >= ((curPage-1)*10 ) && index < (curPage*10));


  const html = [];
  renderData?.length > 0 ? 
    (renderData?.map((prop) => {
      html.push(
        `<div class='${cx("list-item")}'>
            <input 
              type='hidden' 
              id='attendId-${prop.id}' 
              class='${cx("attendId")}' 
              value='${prop.id}' />
            <div>
              <span class="${cx("type", "primary", prop.type)}">
                ${prop.type}
              </span>
            </div>
            <div class="${cx("request-date")}">
              <span > ${prop.startDate} ~ ${prop.endDate}  </span>
            </div>
            <div class="${cx("request-userId")}">${prop.userId}</div>
            <div class="${cx("request-subject")}">${prop.subject}</div>
            <div class="${cx("request-content")}">${prop.content}</div>
            <div class="${cx("request-tools")}">
              <div class="${cx("request-btn", "btn-modify")}">
                ${edit_icon('black')}
              </div>

              <div class="${cx("request-btn", "btn-delete")}">
                ${delete_icon('black')}
              </div>
            </div>
          </div>`
      );
    })) : ('<div>No DataList</div>');
  return html.join("");
};

export default init;
