import React from 'react';
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
        return <div className="tasktable_container">{tasks && tasks.length>0?
                    <table className="tasktable">
                        <tr className="task_table_head">
                            <th className="th_cell"> Task ID </th>
                            <th className="th_cell"> Task Title </th>
                            <th className="th_cell"> Task Statement </th>
                        </tr>
                        {tasks.map((item:any)=>{
                            return <tr className="tl_elem">
                                        <td className="tl_cell">{item.taskNum}</td>
                                        <td className="tl_cell">{item.taskTitle}</td>
                                        <td className="tl_cell"> {item.taskStmt} </td>
                                   </tr>
                        })}
                    </table>
            :''}</div>
    }
  }

export default TaskList;
