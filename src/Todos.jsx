import React, { useState } from "react";
import {
  useDeleteTodo,
  useGetTodo,
  usePostTodo,
  useUpdateTodo,
} from "./QueryHooks";

const Todos = () => {
  const { data, error, isLoading } = useGetTodo();
  const [formData, setFormData] = useState({});
  const { mutate: postData } = usePostTodo();
  const { mutate: deleteData } = useDeleteTodo();
  const { mutate: updateData } = useUpdateTodo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSubmit = () => {
    postData({
      first_name: formData.first_name,
      last_name: formData.last_name,
    });
  };

  const handleDelete = (id) => {
    deleteData(id);
  };

  const handleUpdate = (id) => {
    const updateData = data.find((todo) => todo.id === id);
    setFormData(updateData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalUpdate = () => {
    updateData({ id: formData.id, payload: formData });
  };

  return (
    <>
      <input
        type="text"
        name="first_name"
        value={formData.first_name || ""}
        placeholder="Enter Your FirstName"
        onChange={handleChange}
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name || ""}
        onChange={handleChange}
        placeholder="Enter Your LastName"
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleFinalUpdate}>Confirm Update</button>
      <ul>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <li>First Name: {item.first_name}</li>
            <li>Last Name: {item.last_name}</li>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => handleUpdate(item.id)}>Update</button>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default Todos;
