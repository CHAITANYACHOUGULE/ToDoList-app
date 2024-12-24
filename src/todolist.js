import React, { useState } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState(["Eat", "Shower", "walking"]);
    const [newTask, setnewtasks] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    function handleInputChange(event) {
        setnewtasks(event.target.value);

    }
    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(prevTasks => [...prevTasks, newTask.trim()]);
            setnewtasks("");
        }
    }

    function deleteTask(index) {
        setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    }
    function editTask(index) {
        setEditingIndex(index);
        setEditValue(tasks[index]);
    }

    function saveEdit() {
        if (editValue.trim() !== "") {
            setTasks((prevTasks) => {
              const updatedTasks = [...prevTasks];
              updatedTasks[editingIndex] = editValue.trim(); 
              return updatedTasks;
            });
            setEditingIndex(null); 
            setEditValue(""); 
        }
    }
    function cancelEdit() {
        setEditingIndex(null); 
        setEditValue(""); 
    }

    return (
        <div className='todolist'>
            <h1>To Do List</h1>
            <div>
                <input type='text'
                    placeholder='Enter a task...'
                    value={newTask}
                    onChange={handleInputChange}
                />

                <button className='add-button'
                    onClick={addTask}> Add </button>
            </div>

            <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button className="save-button" onClick={saveEdit}>
                  Save
                </button>
                <button className="cancel-button" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="text">{task}</span>
                <button
                  className="edit-button"
                  onClick={() => editTask(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ol>

    </div>
    );
}

export default TodoList;