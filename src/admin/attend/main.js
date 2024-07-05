// import { AttendList } from './components';
import { addModalEvent } from './components/Modal';
import Layout from './layouts/Layout';

const app = () => {
  init();
  // route();
}

const init = async () => {
  const section = document.querySelector(`.main-content`);

  section.innerHTML = await Layout();

  addModalEvent();

}

// const route = () => {
//   // const content = document.querySelector('#content');
// }

document.addEventListener('DOMContentLoaded', app); 