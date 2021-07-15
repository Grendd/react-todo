import React, {ChangeEvent, FormEvent} from 'react';
import './App.css';
import {Task} from './components/Task'

type Props = {};

type State = {
    tasks: StateTask[];
    value: string
    filter: TaskFilter
    apiTask: number
};

type StateTask = {
    taskName: string
    completed: boolean
    id: number
}

type TaskFilter = "all" | "active" | "completed"


class App extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: [],
            value: "",
            filter: "all",
            apiTask: 0
        }
        this.taskApiGetAll()
    }
    taskApiGetAll(){
        fetch("http://192.168.31.121:5000/api/tasks", {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => response.json())
            .then(
                (result) => {
                    result.forEach((task: any) => {
                        this.setState({
                            tasks: [...this.state.tasks, {taskName: task.taskName, completed: task.completed, id: task.id}],
                            apiTask: task.id + 1
                        })
                    }
                )},
                (error) => {
                    console.log("ERROR:" + error)
                }
            )
    }
    taskApiPost(data : object) {
        fetch('http://192.168.31.121:5000/api/tasks', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    taskApiUpdate(data : object) {
        fetch('http://192.168.31.121:5000/api/tasks', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    taskApiDelete(data : object) {
        fetch('http://192.168.31.121:5000/api/tasks', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }

    addTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        this.taskApiPost({taskName: this.state.value, completed: false, id: this.state.apiTask})
        this.setState({
            tasks: [...this.state.tasks, {taskName: this.state.value, completed: false, id: this.state.apiTask}],
            value: '',
            apiTask: this.state.apiTask + 1
        })
    }

    changeStatus = (task: StateTask) => {
        task.completed = !task.completed
        this.taskApiUpdate(task)
        this.setState({tasks: [...this.state.tasks]})
    }
    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({value: e.currentTarget.value})
    }
    removeTask = (task: StateTask) => {
        this.taskApiDelete(task)
        this.setState({tasks: this.state.tasks.filter((currTask) => currTask !== task)})
    }
    filteringTasks = (task: StateTask) => {
        if (this.state.filter === "active" && !task.completed) {
            return true
        }
        if (this.state.filter === "all") {
            return true
        }
        if (this.state.filter === "completed" && task.completed) {
            return true
        }
        return false
    }

    renderTasks() {
        return this.state.tasks.filter(this.filteringTasks).map((task, index) => {
                return (
                    <Task
                        task={task}
                        index={index}
                        key={task.taskName + index}
                        showMarked={this.changeStatus.bind(this, task)}
                        removeTask={this.removeTask.bind(this, task)}
                    />
                )
            }
        )
    }

    render() {
        return (
            <div className="app">
                <form id="form" onSubmit={this.addTask}>
                    <h1 className="header">toDos</h1>
                    <input id="taskInput" type="text" autoComplete="off" onChange={this.onChange}
                           value={this.state.value} placeholder="What need to be done?"/>
                    <input id="file_input" type="file" onChange={() => console.log(this.files)}/>
                </form>
                <div className="tasks">
                    {this.renderTasks()}
                </div>
                <div className="tasks_controller">
                    <button onClick={() => this.setState({filter: "all"})}>All</button>
                    <button onClick={() => this.setState({filter: "active"})}>Active</button>
                    <button onClick={() => this.setState({filter: "completed"})}>Completed</button>
                </div>
            </div>
        )
    }
}

export default App;
