//KVIECIANT FUNKCIJAS PADUODAM URL. KAD LENGVIAU BUTU TIESIOG KINDAMUOSIUS PASIDAROM

//PVZ: let expensesURL = "http://localhost:3000/expenses/"


import axios from "axios";

export const getAllData = (url) => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const updateData = (id, todoData, url) => {
  return axios
    .patch(url + id, todoData)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const postData = async (todoData, url) => {
  return await axios
    .post(url, todoData)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const deleteData = async (id, url) => {
  return await axios
    .delete(url + id)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

