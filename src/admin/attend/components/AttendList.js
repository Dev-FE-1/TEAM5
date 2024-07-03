import { findAll } from "../api";
import ListItem from "./ListItem";

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

/**
 * const props = {
    title: "근태관리 (관리자)",
    select_options: [
      {
        value: "all",
        text: "모두보기"
      }, 
      {
        value: "leave",
        text: "연차"
      },
      {
        value: "halfday",
        text: "반차"
      },
      {
        value: "absent",
        text: "조퇴"
      }
    ],
    list_headers: [
      "구분",
      "일시",
      "사원명",
      "사유",
      "수정/삭제"
    ],
    list: [
      {
        type: "연차",
        startDate: "2024.06.25",
        endDate: "2024.06.25",
        name: "홍길동",
        content: "개인사유"
      }, 
      {
        type: "연차",
        startDate: "2024.06.25",
        endDate: "2024.06.25",
        name: "홍길동",
        content: "개인사유"
      }, 
      {
        type: "연차",
        startDate: "2024.06.25",
        endDate: "2024.06.25",
        name: "홍길동",
        content: "개인사유"
      }, 
      {
        type: "연차",
        startDate: "2024.06.25",
        endDate: "2024.06.25",
        name: "홍길동",
        content: "개인사유"
      }
    ]
  };
 */

export default async function AttendList () {

  const {data} = await findAll();

  const listHtml = createList(data);

  return listHtml;
}