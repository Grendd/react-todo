import React, {useContext} from "react"
import {TaskFilter} from '../App/App'
import './FilterGroup.scss'
import {AppContext} from "../../context";

export interface FilterGroupProps {
    onClick: (status: TaskFilter) => void;
    currStatus: TaskFilter
}

const FilterGroup = ({onClick, currStatus}: FilterGroupProps) => {
    const {logout} = useContext(AppContext);
    const onChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.innerText === 'All') {
            onClick('all')
        }
        if (e.currentTarget.innerText === 'Active') {
            onClick('active')
        }
        if (e.currentTarget.innerText === 'Completed') {
            onClick('completed')
        }
    }
    return (
        <div className="tasks_controller">
            <button onClick={onChange}><span className={currStatus === 'all' ? "choosed": ''}>All</span></button>
            <button onClick={onChange}><span className={currStatus === 'active' ? "choosed": ''}>Active</span></button>
            <button onClick={onChange}><span className={currStatus === 'completed' ? "choosed": ''}>Completed</span></button>
            <button onClick={() => {
                logout()
                window.location.reload ();
            }} className="exit">Logout</button>
        </div>
    )
}

export default FilterGroup;