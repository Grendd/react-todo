import React, {useState} from 'react';
import ToDos from "../Todos/Todos"
import './App.scss'
import SignInOrUp from "../Authorization/Authorization";

export type TaskFilter = "all" | "active" | "completed"

const App = () => {
    const [isLogined, setIsLogined] = useState<boolean>(false)
    return (
        <div className="app">
            <h1 className="header">toDos</h1>
            {isLogined ? <ToDos /> : <SignInOrUp setIsLogined={setIsLogined} />}
            <footer className="footer">Created by grendd | 2021</footer>
        </div>
    );
}

export default App;
