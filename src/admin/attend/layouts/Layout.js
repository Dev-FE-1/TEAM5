import { AttendComp } from "../api";
import { AttendList } from "../components";
import Modal from "../components/Modal";

const addElement = (prop, type) => {
  const elementHTML = [];

  type == 'option' && prop.map(option => {elementHTML.push(`<option value="${option.value}">${option.text}</option>`)});
  type == 'header' && prop.map(header => {elementHTML.push(`<div>${header}</div>`)});

  return elementHTML.join('');
}

const createLayout = async () => {
  const props = new AttendComp();

  const layoutHTML = [];

  const preLayout = `<header class="main-content-header">
      <div class="header-title">
        <h1>${props.title}</h1>
        <div class="search">
          <input type="text" placeholder="사원명" />
          <svg
            id="Layer_1"
            style="enable-background: new 0 0 512 512"
            version="1.1"
            viewBox="0 0 512 512"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"
            />
          </svg>
        </div>
      </div>
      
      <select>
        ${addElement(props.select_options, "option")}
      </select>
    </header>

    <div class="requests">
      <div class="grid request-header">
        ${addElement(props.list_headers, "header")}
      </div>

    `;

  const postLayout = `</div>`;

  layoutHTML.push(preLayout);
  layoutHTML.push(await AttendList());
  layoutHTML.push(Modal());
  layoutHTML.push(postLayout);

  return layoutHTML.join('');
};

export default async function Layout () {
  return createLayout();
}
