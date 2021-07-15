import React from "react"

export const Task = (props : any) => {

    return (
        <div className="task" key={props.index}>
            <input className="task_checker"
                   id={`task_checker-${props.index}`}
                   type="checkbox"
                   name={`task_checker-${props.index}`}
                   onChange={props.showMarked}
                   checked={props.task.completed}
            />
            <label htmlFor={`task_checker-${props.index}`}/>
            <p>{props.task.taskName}</p>
            <button className="destroy" onClick={props.removeTask}></button>
        </div>
    )
}
