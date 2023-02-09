import React from 'react'
import TaskList from './TaskList'
import './css/home.css'
import { AddTask } from './AddTask'
import {AddRequest} from './AddRequest'
class Home extends React.Component<any,any>{
    dec(val:boolean){
        if (val){
            this.props.addRequest_click(true)
        }
        else{
            this.props.addTask_click(true)
        }
    }
    componentDidMount(){
        this.props.getTasks()
    }
    render(){
        const {tasks,add_task,task_select,addRequest_click, add_request, task_selected}=this.props
        return<div>
            <div className="header">
                University of Massachusetts Amherst
            </div>
            <div className="site_name">
                Center for Intelligent Information Retrieval
            </div>
            <div className="home-sec1">
                {!this.props.add_request_screen && !this.props.add_task_screen ? <div className="task-add-buttons">
                    <div className="home-button" onClick={()=>this.dec(false)}>
                        Add Task
                    </div>
                    {this.props.task_select !== -1 ?<div className="home-button" onClick={()=>this.dec(true)}>
                        Add Request
                    </div>:null}
                </div>:null}
                {this.props.add_request_screen? <AddRequest task_select={task_select} tasks={tasks} addRequest_click={addRequest_click} add_request={add_request}/>
                : this.props.add_task_screen? <AddTask add_task={add_task} add_task_screen={this.props.addTask_click}/>:
                <TaskList tasks={tasks} task_selected={task_selected} randomprops={this.props}/>}
            </div>
        </div>
    }
}
export default Home