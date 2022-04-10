import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};
const create = (contact) => {
  const request = axios.post(baseURL, contact);
  return request.then((response) => response.data);
};

const modify = (id, contact) => {
  const request = axios.put(`${baseURL}/${id}`, contact);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((res) => res.data);
};

export default { getAll, create, modify, deleteContact, baseURL };
