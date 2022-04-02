import React, {ChangeEvent, FormEvent} from "react";

import "./styles.scss";

export interface TaskFormProps {
    inputValue: string
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    onChange: (value: string) => void
    className?: string
}

const TaskForm = ({inputValue, onSubmit, onChange, className}: TaskFormProps) => {
	return (
		<form onSubmit={onSubmit} onClick={e => e.stopPropagation()} className={className === "subtaskInput" ? "subForm" : "taskForm"}>
			<input
				id="taskInput"
				className={`inputs ${className || ""}`}
				type="text"
				autoComplete="off"
				onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
				value={inputValue}
				placeholder={className === "subtaskInput" ? "Enter subtask:" : "What need to be done?"}
				maxLength={60}
			/>
			{/*<input id="file_input" type="file" onChange={() => console.log(this.files)}/>*/}
		</form>
	);
};

export default TaskForm;