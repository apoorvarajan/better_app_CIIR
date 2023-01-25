import React from 'react'
import TaskList from './TaskList'
import './css/home.css'
import { AddTask } from './AddTask'
class Home extends React.Component<any,any>{
    dec(gettask?:boolean){
        if (gettask){
            this.props.getTasks()
        }
        else{
            this.props.addTask_click()
        }
    }
    render(){
        const {tasks}=this.props
        return<div>
            <div className="header">
                University of Massachusetts Amherst
            </div>
            <div className="site_name">
                Center for Intelligent Information Retrieval
            </div>
            <div className="home-sec1">
                <div className="task-add-buttons">
                    <div className="home-button" onClick={()=>this.dec(true)}>
                        Tasks
                    </div>
                    <div className="home-button" onClick={()=>this.dec()}>
                        Add Task
                    </div>
                </div>
                {this.props.add_task_screen? <AddTask/>:
                <TaskList tasks={tasks}/>}
            </div>
        </div>
    }
}
export default Home