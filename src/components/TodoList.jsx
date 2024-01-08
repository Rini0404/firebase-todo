import React, { useEffect, useState } from "react";
import { doc, setDoc, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import TodosInDb from "./TodosInDb";
import LoadingIndicator from "./LoadingIndicator";

export default function TodoList({ dataBase }) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [madeBy, setMadeBy] = useState("");


  const [todosInDatabase, setTodosInDatabase] = useState([]);

  const [todos, loading, error] = useCollection(
    collection(dataBase, "todos"),
    {}
  );

  useEffect(() => {
    if (todos) {
      setTodosInDatabase(
        todos.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
  }, [todos]);

  const handleAddingTodo = async (e) => {
    e.preventDefault();
    
    if(!title || !madeBy) return alert("Please fill out all fields");

    try {
      const todoObject = {
        title,
        completed,
        madeBy,
        createdAt: new Date(),
      };

      await setDoc(doc(dataBase, "todos", `todo-${Date.now()}`), todoObject);
      // Reset form after submission
      setTitle("");
      setCompleted(false);
      setMadeBy("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleAddingTodo}>
          <input
            type="text"
            placeholder="Enter todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Made by"
            value={madeBy}
            onChange={(e) => setMadeBy(e.target.value)}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
      {todosInDatabase && !loading && (
        <TodosInDb todosInDatabase={todosInDatabase}  dataBase = { dataBase} />
      )}

      {loading && <LoadingIndicator/>}
      {error && <p>Error fetching todos</p>}
    </>
  );
}
