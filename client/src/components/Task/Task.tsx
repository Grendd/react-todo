import React, {FormEvent, useContext, useState} from "react";
import TaskForm from "../TaskForm/TaskForm";

import './Task.scss';
import editIcon from './edit.svg'
import {AppContext} from "../../context";

export type StateTask = {
    taskName: string
    completed: boolean
    id: string
}
export interface FullStateTask extends StateTask {
    subtasks: StateTask[] | []
}

export interface TaskProps {
    index: number;
    showMarked: () => void;
    removeTask: () => void;
    task: StateTask
    className?: string;
}
export interface TaskWrapperProps extends TaskProps {
    addSubTask: (tasks: StateTask[], id: string) => void;
    task: FullStateTask
}
const Task = ({index, showMarked, removeTask, task, className} : TaskProps) => {
    return (
        <div className={className ? `task ${className}` : "task"}>
            <input className="task_checker"
                   id={`${className ? 'sub' : ''}task_checker-${index}`}
                   type="checkbox"
                   name={`${className ? 'sub' : ''}task_checker-${index}`}
                   onChange={showMarked}
                   checked={task.completed}
            />
            <label htmlFor={`${className ? 'sub' : ''}task_checker-${index}`}/>
            <p>{task.taskName}</p>
            <button className="edit"><img src={editIcon} alt="edit"/></button>
            <button className="destroy" onClick={removeTask}></button>
        </div>
    )
}
interface SubtasksProps {
    subtasks: StateTask[] | []
    addSubTask: (tasks: StateTask[], id: string) => void;
    taskId: string
}

const Subtasks = ({subtasks, addSubTask, taskId}: SubtasksProps) => {
    const {filter} = useContext(AppContext)
    const [inputValue, setInputValue] = useState<string>('');

    const addTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addSubTask([...subtasks, {taskName: inputValue, completed: false, id: (new Date).toString()}], taskId)
        setInputValue('')
    }

    const changeStatus = (task: StateTask) => {
        task.completed = !task.completed
        addSubTask([...subtasks], taskId)
    }

    const removeTask = (task: StateTask) => {
        addSubTask([...subtasks.filter((currTask) => currTask !== task)], taskId)
    }

    const filteringTasks = (task: StateTask) => {
        if (filter === "all") {
            return true
        }
        if (filter === "active" && !task.completed) {
            return true
        }
        if (filter === "completed" && task.completed) {
            return true
        }
        return false
    }

    return (
        <div className={'subtasks'} onClick={(e) => e.stopPropagation()}>
            {subtasks.length > 0 && subtasks.filter(filteringTasks).map((task, index) => {
                return(
                    <Task
                        index={index}
                        showMarked={changeStatus.bind(this, task)}
                        removeTask={removeTask.bind(this, task)}
                        task={task}
                        className={'subtask'}
                        key={`task-${index}`}
                    />
                )
            })}
            <TaskForm
                inputValue={inputValue}
                onSubmit={addTask}
                onChange={setInputValue}
                className={'subtaskInput'}
            />
        </div>
    );
}

const TaskWrapper = (props: TaskWrapperProps) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const clickOpenTask = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.toggle('opened')
        setIsOpened(!isOpened);
    }
    return (
        <div className="task_wrapper" key={props.index} onClick={clickOpenTask}>
            <Task {...props}/>
            {isOpened && <Subtasks subtasks={props.task.subtasks || []} addSubTask={props.addSubTask} taskId={props.task.id}/>}
        </div>
    );
}

export default TaskWrapper;
