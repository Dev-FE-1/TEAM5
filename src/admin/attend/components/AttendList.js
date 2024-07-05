import { findAll, findOne } from "../api";
import { reRender } from "../main";
import ListItem from "./ListItem";
import { setModifyData } from "./Modal";

class Pagenation {
  constructor(props) {
    this.curPage = props?.curPage ?? 1;
    this.countPerPage = 10;
    this.totalPage = Math.ceil((props.data?.length ?? 0) / 10) ?? 1;
  }
}

const createList = (dataList) => {
  const menuHtml = [];

  // before
  menuHtml.push(`<div class="grid request-item">`);

  dataList.map((item) => {
    menuHtml.push(ListItem(item));
  });

  // after
  menuHtml.push(`</div>`);

  return menuHtml.join('');
};

export const addListEvent = () => {

  // 수정 버튼(open modal)
  document.querySelectorAll('.btn-modify').forEach((item) => {
    item.addEventListener('click', openModal);
  });

  // 삭제 버튼
  document.querySelectorAll('.btn-delete').forEach((item) => {
    item.addEventListener('click', deleteAttend);
  });

  document.querySelector('#searchType').addEventListener('change', chgType);

  document.querySelector('.pagenation').addEventListener('click', () => {console.log('paging~!')});
}

// 모달 오픈 버튼, 
export const openModal = async (event) => {
  const id = event.target.closest('div.list-item').querySelector('.attendId').value;

  const modalContainer = document.querySelector('.modal-container');
  modalContainer.classList.remove('disappear');
  modalContainer.classList.add('appear');

  const {status, data} = await findOne({attendId: id});
  if(status === 'OK') setModifyData({data: data, obj: modalContainer});
}

// 근태 1개 삭제
export const deleteAttend = async (event) => {
  const id = event.target.closest('div.list-item').querySelector('.attendId').value;

  const apiResult = await remove({attendId: id});
  if(apiResult?.status === "DELETE") reloadLayout();
}

export const chgType = async (event) => {
  const curType = event.target.value;

  await reRender({type: curType});
}

export const createPagenation = (props) => {
  const pagenation = new Pagenation({curPage: props?.curPage ?? 1, data: props.data});
  console.log(pagenation, pagenation.curPage, pagenation.curPage == 1 ?? 'curPage');

  const pageHTML = [];
  pageHTML.push(`<div class='pagenation'>`);
  for(let i = 0; i < pagenation.totalPage; i++) {
    pageHTML.push(`<div class='pageNum ${pagenation.curPage == i+1 ? 'curPage' : ''}'>${i+1}</div>`);
  }

  pageHTML.push(`</div>`);

  return pageHTML.join('');
}

export default async function AttendList (prop) {

  let listHtml = createList(prop.data);

  return listHtml;
}