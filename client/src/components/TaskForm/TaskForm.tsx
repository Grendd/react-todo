import React, {ChangeEvent, FormEvent} from "react";
import './TaskForm.scss'
export interface TaskFormProps {
    inputValue: string
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    onChange: (value: string) => void
    className?: string
}

const TaskForm = ({inputValue, onSubmit, onChange, className}: TaskFormProps) => {
    return (
        <form onSubmit={onSubmit} onClick={e => e.stopPropagation()} className={className === 'subtaskInput' ? 'subForm' : ''}>
            <input
                id="taskInput"
                className={`inputs ${className || ''}`}
                type="text"
                autoComplete="off"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
                value={inputValue}
                placeholder="What need to be done?"
                maxLength={18}
            />
            {/*<input id="file_input" type="file" onChange={() => console.log(this.files)}/>*/}
        </form>
    )
}

export default TaskForm;