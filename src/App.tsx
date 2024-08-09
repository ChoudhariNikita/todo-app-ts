import React, { useState } from 'react';
import './App.css';

// Define the Todo interface
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([]); // Specify the type of todos
    const [inputValue, setInputValue] = useState<string>(''); // Specify the type of inputValue

    // Function to add a todo item
    const addTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo: Todo = { // Create a new todo with the Todo interface
                id: Date.now(),
                text: inputValue,
                completed: false,
            };
            setTodos([...todos, newTodo]);
            setInputValue(''); // Clear input field
        }
    };

    // Function to toggle completion status
    const toggleTodo = (id: number) => { // Specify the type of id
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    // Function to delete a todo item
    const deleteTodo = (id: number) => { // Specify the type of id
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div className="app-container">
            <h1>Todo App</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new todo"
                    className="todo-input"
                />
                <button onClick={addTodo} className="add-button">Add</button>
            </div>

            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        {todo.text}
                        <button onClick={() => toggleTodo(todo.id)} className="toggle-button">
                            {todo.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
