import React, {useState} from 'react';
import ToDos from "../Todos/Todos"
import {AppContext} from '../../context'
import {useAuth} from "../../hooks/auth";
import SignInOrUp from "../Authorization/Authorization";

import './App.scss'

export type TaskFilter = "all" | "active" | "completed"

const App = () => {
    const {token, login, logout, userId} = useAuth()
    const local = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null
    const isAuthenticated = (local && !!local.token) || !!token
    const [isLogined, setIsLogined] = useState<boolean>(isAuthenticated)
    return (
        <AppContext.Provider value={{
              token, login, logout, userId, isAuthenticated
            }}>
            <div className="app">
                <h1 className="header">toDos</h1>
                {isLogined ? <ToDos /> : <SignInOrUp setIsLogined={setIsLogined} />}
                <footer className="footer">Created by <a href="http://github.com/grendd">grendd</a> | 2021</footer>
            </div>
        </AppContext.Provider>
    );
}

export default App;
