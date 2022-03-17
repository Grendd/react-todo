import React, {FormEvent, useContext, useEffect, useState} from "react";
import TaskWrapper, {FullStateTask, StateTask} from "../Task/Task";
import {taskApiDelete, taskApiGetAll, taskApiPost, taskApiUpdate} from "../../api/taskApi";
import {AppContext, ToDoContext} from "../../context";
import TaskForm from "../TaskForm/TaskForm";
import FilterGroup from "../FilterGroup/FilterGroup";
import {TaskFilter} from "../App/App";
import './Todos.scss'

const ToDos = () => {
    const {userId} = useContext(AppContext)
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
        taskApiPost({taskName: inputValue, completed: false, id: (new Date).toString(), subtasks: [], owner: userId})
        setTasks([...tasks, {taskName: inputValue, completed: false, id: (new Date).toString(), subtasks: []}]);
        setInputValue('');
    }

    const changeStatus = (task: FullStateTask) => {
        task.completed = !task.completed
        task.subtasks.map(subtask => {
            subtask.completed = task.completed;
        })
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
        taskApiGetAll(userId).then(
            (result) => {
                setTasks(result)
            },
            (error) => {
                console.log("ERROR:" + error)
            }
        )
    }, [userId])
    return (
        <ToDoContext.Provider value={{ filter: filterValue}}>
            <TaskForm
                onSubmit={addTask}
                inputValue={inputValue}
                className={'taskInput'}
                onChange={setInputValue}
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
        </ToDoContext.Provider>
    )
}

export default ToDos