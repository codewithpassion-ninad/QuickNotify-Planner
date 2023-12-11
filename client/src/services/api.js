import axios from "axios";
import { DELETE_TODO, LOGIN, MARK_TODO, TODO_LIST } from "./apiConstants";
import { REGISTER } from "./apiConstants";
import { CREATE_TODO } from "./apiConstants";

export const login = async (data) => {
  return axios.post(LOGIN, data);
};
export const register = async (data) => {
  return axios.post(REGISTER, data);
};
export const createTodoApi = async (data) => {
  let token = getToken();
  console.log(token, "token data");
  return axios.post(CREATE_TODO, data, {
    headers: {
      auth: token,
    },
  });
};

export const getTodoListApi = async (data) => {
  let token = getToken();
  console.log(token, "token data");
  return axios.get(TODO_LIST, {
    headers: {
      auth: token,
    },
  });
};

export const deleteTodoApi = async (data) => {
  let token = getToken();
  console.log(token, "token data");
  return axios.post(DELETE_TODO, data, {
    headers: {
      auth: token,
    },
  });
};

export const MarkTodoApi = async (data) => {
  let token = getToken();
  return axios.post(MARK_TODO, data, {
    headers: {
      auth: token,
    },
  });
};


export function getToken() {
  let user = localStorage.getItem("user");
  if (!user) return;
  const userObj = JSON.parse(user);
  return userObj.token;
}
