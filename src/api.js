import axios from "axios";

let api = axios.create({
  baseURL: "http://localhost:8000/",
});

export const fetchData = async () => {
  const { data } = await api.get("/todo");
  return data;
};
export const postData = async (payload) => {
  const { data } = await api.post("/todo", payload);
  return data;
};
export const deleteData = async (id) => {
  const { data } = await api.delete(`/todo/${id}`);
  return data;
};

export const updateData = async (id, payload) => {
  const { data } = await api.put(`/todo/${id}`, payload);
  return data;
};
