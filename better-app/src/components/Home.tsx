import React from 'react'
import TaskList from './TaskList'
import './css/home.css'
import { AddTask } from './AddTask'
class Home extends React.Component<any,any>{
    dec(){
        this.props.addTask_click(true)
    }
    componentDidMount(){
        this.props.getTasks()
    }
    render(){
        const {tasks,add_task}=this.props
        return<div>
            <div className="header">
                University of Massachusetts Amherst
            </div>
            <div className="site_name">
                Center for Intelligent Information Retrieval
            </div>
            <div className="home-sec1">
                {!this.props.add_task_screen ? <div className="task-add-buttons">
                    <div className="home-button" onClick={()=>this.dec()}>
                        Add Task
                    </div>
                    {this.props.task_select !== -1 ?<div className="home-button" onClick={()=>this.dec()}>
                        Add Request
                    </div>:null}
                </div>:null}
                {this.props.add_task_screen? <AddTask add_task={add_task} add_task_screen={this.props.addTask_click}/>:
                <TaskList tasks={tasks} task_selected={this.props.task_selected}/>}
            </div>
        </div>
    }
}
export default Home