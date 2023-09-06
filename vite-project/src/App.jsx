import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', second: 'numeric' });
      setCurrentTime(timeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  const handleAddTodo = () => {
    if (toDo.trim() !== '') {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), Text: toDo, status: false },
      ]);
      setToDo('');
    }
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Monday 🌝 ☕</h2>
      </div>
      <div className="currentTime">{currentTime}</div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={handleAddTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  onChange={(e) => {
                    setTodos((prevTodos) =>
                      prevTodos.map((todo) => {
                        if (todo.id === obj.id) {
                          todo.status = e.target.checked;
                        }
                        return todo;
                      })
                    );
                  }}
                  value={obj.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>{obj.Text}</p>
              </div>
              <div className="right">
                <i onClick={() => deleteTodo(obj.id)} className="fas fa-times"></i>
              </div>
            </div>
          );
        })}
        {toDos.map((obj) => {
          if (obj.status) {
            return <h1 key={obj.id}>{obj.Text}</h1>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
