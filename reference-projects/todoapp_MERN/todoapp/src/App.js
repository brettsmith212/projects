import React, { useState } from "react";

import Form from "./components/Form";
import Section from "./components/Section";
import List from "./components/List";

const appTitle = "To-Do App";

const list = [
  { id: 1, title: "TEST1", completed: false },
  { id: 2, title: "TEST2", completed: false },
  { id: 3, title: "TEST3", completed: false },
];

const App = () => {
  const [todoList, setTodoList] = useState(list);

  const addToDo = (item) => {
    setTodoList((prevList) => [...prevList, item]);
  };

  const removeTodo = (id) => {
    setTodoList((oldList) => oldList.filter((item) => item.id !== id));
  };

  return (
    <div className="ui container center aligned">
      <Section>
        <h1>{appTitle}</h1>
      </Section>
      <Section>
        <Form addToDo={addToDo} />
      </Section>
      <Section>
        <List removeTodoListProp={removeTodo} list={todoList} />
      </Section>
    </div>
  );
};

export default App;
