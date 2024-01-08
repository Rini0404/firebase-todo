import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export default function TodosInDb({ todosInDatabase, dataBase }) {
  const [editingTodo, setEditingTodo] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    madeBy: "",
    completed: false,
  });

  const handleEditingTodo = async (todo) => {
    if(!editFormData.title || !editFormData.madeBy) return alert("Please fill out all fields");
    try {

      await updateDoc(doc(dataBase, "todos", todo.id), {
        ...editFormData,
        completed: editFormData.completed === "Yes",
      });
      setEditingTodo(null); // Reset editingTodo state
      setEditFormData({
        title: "",
        madeBy: "",
        completed: false,
      });
    } catch (error) {
      console.error("Error editing document: ", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeletingTodo = async (id) => {
    try {
      console.log("Deleting todo with id: ", id);
      await deleteDoc(doc(dataBase, "todos", id));
    } catch (error) {
      console.log("Error deleting document: ", error);
    }
  };

  const renderEditForm = (todo) => {
    return (
      <div className="todo-list">
        <input
          type="text"
          name="title"
          value={editFormData.title}
          onChange={handleFormChange}
          placeholder={todo.title}
        />
        <input
          type="text"
          name="madeBy"
          value={editFormData.madeBy}
          placeholder={todo.madeBy}
          onChange={handleFormChange}
        />
        <button
          className="completed-button"
        onClick={() => handleEditingTodo(todo)}>Submit
        </button>
        <button 
        className="cancel-button"
        onClick={() => setEditingTodo(null)}>Cancel</button>
      </div>
    );
  };

  return (
    <div className="todos-container">
      {todosInDatabase.map((todo) => (
        <div className="todo-card" key={todo.id}>
          {editingTodo === todo.id ? (
            renderEditForm(todo)
          ) : (
            <>
              <h3>{todo.title}</h3>
              <p>Made by: {todo.madeBy}</p>
              <p>Completed: {todo.completed ? "Yes" : "No"}</p>
              <button
                onClick={() => {
                  handleDeletingTodo(todo.id);
                }}
                className="delete-button"
              >
                Delete
              </button>
              <button
                onClick={() => setEditingTodo(todo.id)}
                className="edit-button"
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
