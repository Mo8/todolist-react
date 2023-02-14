import './App.css'
import React, { useState } from 'react';

function TodoList() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [contacts, setContacts] = useState([]);
  const contactSupported = ('contacts' in navigator && 'ContactsManager' in window);
  const initContacts = async () => {
    console.log("test");
    if(contactSupported){
      const properties = await navigator.contacts.getProperties();
      console.log(properties);
      const contacts = await navigator.contacts.select(properties,{multiple: true});
      console.log(contacts);
      setContacts(contacts);
    }
  }
  if(contacts === null)
    initContacts();

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const completeTask = (index) => {
    const newCompletedTasks = [...completedTasks, tasks[index]];
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setCompletedTasks(newCompletedTasks);
    setTasks(newTasks);
  };

  const undoTask = (index) => {
    const newTasks = [...tasks, completedTasks[index]];
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks.splice(index, 1);
    setTasks(newTasks);
    setCompletedTasks(newCompletedTasks);
  };


  

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              onChange={() => completeTask(index)}
            />
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              onChange={() => undoTask(index)}
              checked
            />
            {task}
          </li>
        ))}
      </ul>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            
            {contact}
          </li>
        ))}
      </ul>
      {contactSupported?"oui":"non"}
    </div>
  );
}

export default TodoList;
