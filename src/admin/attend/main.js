// import { AttendList } from './components';
import { addListEvent } from './components/AttendList';
import { addModalEvent } from './components/Modal';
import Layout from './layouts/Layout';

const app = () => {
  init();
  // route();
}

const init = async () => {
  const section = document.querySelector(`.main-content`);

  section.innerHTML = await Layout();

  addListEvent();
  addModalEvent();
}

export const reRender = async (props) => {
  const section = document.querySelector(`.main-content`);

  section.innerHTML = await Layout(props?.type);

  addListEvent();
  addModalEvent();
}

document.addEventListener('DOMContentLoaded', app); 