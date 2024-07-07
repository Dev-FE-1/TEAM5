import axios from 'axios';

const baseURL = 'http://localhost:8080';
const attendURL = baseURL + '/api/attends';


// 전체조회
export const findAll = async () => {
  try {
    const {data} = await axios.get(attendURL);
    console.log(data);

    return data;
  } catch(err) {
    console.error(err);
    return {error: err, msg: '에러가 발생했습니다.'};
  }
};

export const findAllByUserId = async (props) => {
  try {
    const {data} = await axios.get(attendURL+`/user/${props.userId}`);

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
  try {
    const {data} = await axios.post(attendURL, props);

    return data;
  } catch(err) {
    console.error(err);
    return {error: err, msg: '에러가 발생했습니다.'};
  }
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