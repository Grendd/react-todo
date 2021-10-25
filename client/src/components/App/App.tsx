import React, {FormEvent, useEffect, useState} from 'react';
import FilterGroup from '../FilterGroup/FilterGroup';
import TaskWrapper, {FullStateTask, StateTask} from '../Task/Task';
import TaskForm from "../TaskForm/TaskForm";
import {taskApiGetAll, taskApiPost, taskApiDelete, taskApiUpdate} from "../../api/taskApi";
import {AppContext} from "../../context";

import './App.scss';

export type TaskFilter = "all" | "active" | "completed";



const App = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filterValue, setFilterValue] = useState<TaskFilter>('all');
    const [tasks, setTasks] = useState<FullStateTask[]>([]);

    const addSubTask = (subtasks: StateTask[], id: string) => {
        const updatingTask = tasks.filter(task => task.id === id)[0];
        updatingTask.subtasks = subtasks;
        taskApiUpdate(updatingTask)
        setTasks([...tasks])
    }
    const addTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        taskApiPost({taskName: inputValue, completed: false, id: (new Date).toString(), subtasks: []})
        setTasks([...tasks, {taskName: inputValue, completed: false, id: (new Date).toString(), subtasks: []}]);
        setInputValue('');
    }

    const changeStatus = (task: FullStateTask) => {
        task.completed = !task.completed
        taskApiUpdate(task)
        setTasks([...tasks])
    }

    const removeTask = (task: FullStateTask) => {
        taskApiDelete(task)
        setTasks(tasks.filter((currTask) => currTask !== task))
    }
    const filteringTasks = (task: FullStateTask) => {
        if (filterValue === "all") {
            return true
        }
        if (filterValue === "active" && !task.completed) {
            return true
        }
        if (filterValue === "completed" && task.completed) {
            return true
        }
        return false
    }

    useEffect(() => {
        taskApiGetAll().then(
            (result) => {
                setTasks(result)
            },
            (error) => {
                console.log("ERROR:" + error)
            }
        )
    }, [])
    return (
        <div className="app">
            <AppContext.Provider value={{ filter: filterValue}}>
                <h1 className="header">toDos</h1>
                <TaskForm
                    addTask={addTask}
                    inputValue={inputValue}
                    className={'taskInput'}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                />
                <div className="tasks">
                    {tasks.filter(filteringTasks).map((task, index) => {
                        return (
                            <TaskWrapper
                                task={task}
                                index={index}
                                key={task.taskName + index}
                                showMarked={changeStatus.bind(this, task)}
                                removeTask={removeTask.bind(this, task)}
                                addSubTask={addSubTask}
                            />
                        );
                    })}
                </div>
                <FilterGroup onClick={setFilterValue} currStatus={filterValue}/>
            </AppContext.Provider>
            <footer className="footer">Created by grendd | 2021</footer>
        </div>
    );
}

export default App;
