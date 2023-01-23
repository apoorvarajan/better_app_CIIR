import React from 'react'
import TaskList from './TaskList'
import './css/home.css'
class Home extends React.Component<any,any>{
    dec(){
        this.props.getTasks()
    }
    render(){
        const {tasks}=this.props
        return<div>
            <div className="header">
                University of Massachusetts Amherst
            </div>
            <div className="web-intro">
                An introduction about the website 
            </div>
            <div className="home-sec1">
                <div className="task-add-buttons">
                    <div className="home-button" onClick={this.dec.bind(this)}>
                        Tasks
                    </div>
                    <div className="home-button">
                        Add Task
                    </div>
                </div>
                <TaskList tasks={tasks}/>
            </div>
        </div>
    }
}
export default Home