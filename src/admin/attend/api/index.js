import axios from 'axios';

const baseURL = 'http://localhost:8080';
const attendURL = baseURL + '/api/attends';


export class AttendComp {
  constructor(dataList) {
    this.title = "근태관리 (관리자)";
    this.select_options = [{
      value: "",
      text: "모두보기"
    }, 
    {
      value: "연차",
      text: "연차"
    },
    {
      value: "반차",
      text: "반차"
    },
    {
      value: "조퇴",
      text: "조퇴"
    }];
    this.list_headers = ["구분", "일시", "사원명", "제목", "내용", "수정/삭제"];

    this.dataList = dataList;
  }
}

// 전체조회
export const findAll = async () => {
  try {
    const {data} = await axios.get(attendURL);

    return data;
  } catch(err) {
    console.error(err);
    return {error: err, msg: '에러가 발생했습니다.'};
  }
};

export const findOne = async (props) => {
  try {
    const {data} = await axios.get(attendURL+`/${props.attendId}`);

    return data;
  } catch(err) {
    console.error(err);
    return {error: err, msg: '에러가 발생했습니다.'};
  }
}

export const create = async (props) => {

}

export const modify = async (props) => {
  try {
    const {data} = await axios.put(attendURL+`/${props.attendId}`, props);

    return data;
  } catch(err) {
    console.error(err);
    return {error: err, msg: '에러가 발생했습니다.'};
  }
}

export const remove = async (props) => {
  try {
    const {data} = await axios.delete(attendURL+`/${props.attendId}`);

    return data;
  } catch(err) {
    console.error(err);
    return {error: err, msg: '에러가 발생했습니다.'};
  }
}