import React,{useEffect,useState} from 'react';
import '../App.css';

class TaskList extends React.Component<any,any> {
    constructor(props:any){
        super(props)
        this.state={
            tasks:null,
            loading:false
        }
    }
    
    render(){
        const {tasks}=this.props
        return <div>{tasks && tasks.length>0?
            tasks.map((item:any)=>{
                return <div>{item.taskNum}</div>
            })
            :''}</div>
    }
  }

export default TaskList;
