import React, {ChangeEvent, FormEvent} from "react";
import './TaskForm.scss'
export interface TaskFormProps {
    inputValue: string
    addTask: (e: FormEvent<HTMLFormElement>) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    className?: string
}

const TaskForm = ({inputValue, addTask, onChange, className}: TaskFormProps) => {
    return (
        <form onSubmit={addTask} onClick={e => e.stopPropagation()} className={className === 'subtaskInput' ? 'subForm' : ''}>
            <input
                id="taskInput"
                className={className || ''}
                type="text"
                autoComplete="off"
                onChange={onChange}
                value={inputValue}
                placeholder="What need to be done?"
                maxLength={18}
            />
            {/*<input id="file_input" type="file" onChange={() => console.log(this.files)}/>*/}
        </form>
    )
}

export default TaskForm;