// import { AttendList } from './components';
import { openModal } from './components/Modal';
import Layout from './layouts/Layout';

const app = () => {
  init();
  route();
}

const init = async () => {
  const section = document.querySelector(`.main-content`);

  section.innerHTML = await Layout();

  const openModalBtns = document.querySelectorAll('.btn-modify').forEach((item) => {
    item.addEventListener('click', openModal);
  });

  // console.log(openModalBtns);

  // window.addEventListener('popstate', route);
}

const route = () => {
  // const content = document.querySelector('#content');
  
}



document.addEventListener('DOMContentLoaded', app); 