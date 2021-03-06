import React, {FormEvent, ChangeEvent, useContext, useState} from "react";
import TaskForm from "../TaskForm";
import {ToDoContext} from "../../context";
import {StateTask, FullStateTask} from "../../types";

import "./styles.scss";



export interface TaskProps {
    index: number;
    showMarked: (e: ChangeEvent<HTMLInputElement>) => void;
    removeTask: () => void;
    task: StateTask
    className?: string;
}

const dateConverter = (text: string) => {
	const dateSplitted = text.split(" ");

	return `${dateSplitted[2]} ${dateSplitted[1]} ${dateSplitted[3].slice(2)}`;
};

const Task = ({index, showMarked, removeTask, task, className} : TaskProps) => {
	
	return (
		<div className={className ? `task ${className}` : "task"}>
			{!className && (
				<p className="date">{dateConverter(task.id)}</p>
			)}
			<input className="task_checker"
				id={`${className ? "sub" : ""}task_checker-${task.taskName}-${index}`}
				type="checkbox"
				name={`${className ? "sub" : ""}task_checker-${task.taskName}-${index}`}
				onChange={showMarked}
				checked={task.completed}
			/>
			<label htmlFor={`${className ? "sub" : ""}task_checker-${task.taskName}-${index}`}/>
			<p>{task.taskName}</p>
			<button className="destroy" onClick={removeTask}/>
		</div>
	);
};

interface SubtasksProps {
    subtasks: StateTask[] | []
    addSubTask: (tasks: StateTask[], id: string) => void;
    taskId: string
}

const Subtasks = ({subtasks, addSubTask, taskId}: SubtasksProps) => {
	const {filter} = useContext(ToDoContext);
	const [inputValue, setInputValue] = useState<string>("");

	const addTask = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		addSubTask([...subtasks, {taskName: inputValue, completed: false, id: (new Date).toString()}], taskId);
		setInputValue("");
	};

	const changeStatus = (task: StateTask) => {
		task.completed = !task.completed;
		addSubTask([...subtasks], taskId);
	};

	const removeTask = (task: StateTask) => {
		addSubTask([...subtasks.filter((currTask) => currTask !== task)], taskId);
	};

	const filteringTasks = (task: StateTask) => {
		if (filter === "all") {
			return true;
		}
		if (filter === "active" && !task.completed) {
			return true;
		}
		if (filter === "completed" && task.completed) {
			return true;
		}
		return false;
	};

	return (
		<div className={"subtasks"} onClick={(e) => e.stopPropagation()}>
			{subtasks.length > 0 && subtasks.filter(filteringTasks).map((task, index) => {
				return(
					<Task
						index={index}
						showMarked={changeStatus.bind(this, task)}
						removeTask={removeTask.bind(this, task)}
						task={task}
						className={"subtask"}
						key={`task-${task.taskName}-${index}`}
					/>
				);
			})}
			<TaskForm
				inputValue={inputValue}
				onSubmit={addTask}
				onChange={setInputValue}
				className={"subtaskInput"}
			/>
		</div>
	);
};

export interface TaskWrapperProps extends TaskProps {
    addSubTask: (tasks: StateTask[], id: string) => void;
    task: FullStateTask
}

const TaskWrapper = (props: TaskWrapperProps) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const clickOpenTask = (e: React.MouseEvent<HTMLDivElement>) => {
		if (String(e.target) === "[object HTMLLabelElement]" || String(e.target) === "[object HTMLInputElement]") {
			return;
		}
		e.currentTarget.classList.toggle("opened");
		e.currentTarget.classList.toggle("closed");
		setIsOpened(!isOpened);
	};

	return (
		<div className="task_wrapper closed" key={props.index} onClick={clickOpenTask}>
			<Task {...props}/>
			{isOpened && <Subtasks subtasks={props.task.subtasks || []} addSubTask={props.addSubTask} taskId={props.task.id}/>}
		</div>
	);
};

export default TaskWrapper;
