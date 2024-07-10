import { AttendComp, findAll } from "../api";
import { AttendList } from "../components";
import { createPagenation } from "../components/AttendList";
import Modal from "../components/Modal";

const addElement = (prop, target, type) => {
  const elementHTML = [];

  target == 'option' && prop.map(option => {elementHTML.push(`<option value="${option.value}" ${type == option.value && 'selected'}>${option.text}</option>`)});
  target == 'header' && prop.map(header => {elementHTML.push(`<div>${header}</div>`)});

  return elementHTML.join('');
}

const render = async ( type ) => {
  const props = new AttendComp();

  const layoutHTML = [];

  const preLayout = `<header class="main-content-header">
      <div class="header-title">
        <h1>${props.title}</h1>
      </div>
      
      <select id='searchType'>
        ${addElement(props.select_options, "option", type)}
      </select>
    </header>

    <div class="requests">
      <div class="grid request-header">
        ${addElement(props.list_headers, "header")}
      </div>

    `;

  const postLayout = `</div>`;

  layoutHTML.push(preLayout);

  let {data} = await findAll();

  if(!!type) {
    data = data.filter(item => item.type==`${type}`);
  }

  layoutHTML.push(await AttendList({data: data, type: type}));
  layoutHTML.push(Modal());
  layoutHTML.push(postLayout);
  layoutHTML.push(createPagenation({data: data}));

  return layoutHTML.join('');
}

export default async function Layout (type) {
  // return createLayout(type);
  return render(type);
}
