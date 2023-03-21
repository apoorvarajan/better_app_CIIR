import React from 'react';
import '../App.css';

class TaskList extends React.Component<any,any> {
    constructor(props:any){
        super(props)
        this.state={
            tasks_list:[],
            loading:false
        }
    }
    componentDidMount(){
        const {tasks}=this.props
        if (tasks){
            let obj=[]
            for(let i=0;i<tasks.length;i++){
                obj.push({
                    "taskNum":tasks[i].taskNum,
                    "taskTitle":tasks[i].taskTitle,
                    "taskStmt":tasks[i].taskStmt,
                    "taskNarr":tasks[i].taskNarr,
                    "req_no":(tasks[i].requests && tasks[i].requests.length) || 0,
                    "is_expanded":false,
                    'is_selected':false
                })
                if(tasks[i].requests && tasks[i].requests.length){
                    const req=tasks[i].requests
                    for(let j=0;j<req.length;j++){
                        obj.push({
                            "reqNum":req[j].reqNum,
                            "reqText":req[j].reqText,
                            "taskNum":tasks[i].taskNum,
                            "hidden":true
                        })
                    }
                }
            }
            this.setState({
                tasks_list:obj
            })
        }
    }
    componentDidUpdate(prevProps:any){
        const {tasks}=this.props
        if (tasks !== prevProps.tasks){
            let obj=[]
            for(let i=0;i<tasks.length;i++){
                obj.push({
                    "taskNum":tasks[i].taskNum,
                    "taskTitle":tasks[i].taskTitle,
                    "taskStmt":tasks[i].taskStmt,
                    "taskNarr":tasks[i].taskNarr,
                    "req_no":(tasks[i].requests && tasks[i].requests.length) || 0,
                    "is_expanded":false,
                    'is_selected':false
                })
                if(tasks[i].requests && tasks[i].requests.length){
                    const req=tasks[i].requests
                    for(let j=0;j<req.length;j++){
                        obj.push({
                            "reqNum":req[j].reqNum,
                            "reqText":req[j].reqText,
                            "taskNum":tasks[i].taskNum,
                            "hidden":true
                        })
                    }
                }
            }
            this.setState({
                tasks_list:obj
            })
        }
    }
    expand_task(taskNum:number){
        const {tasks_list}=this.state
        let obj=tasks_list
        for(let i=0;i<obj.length;i++){
            if(obj[i].reqNum && obj[i].taskNum===taskNum){
                obj[i].hidden=!obj[i].hidden
            }
            if(!obj[i].reqNum && obj[i].taskNum===taskNum){
                obj[i].is_expanded=!obj[i].is_expanded
            }
        }
        this.setState({
            tasks_list:obj
        })
    }
    selectTask(taskNum:number){
        const {tasks_list}=this.state
        let obj=tasks_list
        for(let i=0;i<obj.length;i++){
            if (!obj[i].reqNum && obj[i].taskNum === taskNum){
                obj[i].is_selected = !obj[i].is_selected
                this.props.task_selected(taskNum)
            }
            else if(taskNum){
                obj[i].is_selected = false
            }
        }
        this.setState({
            tasks_list:obj
        })
    }
    showResults(item:any){
        window.location.href="/results?reqNum="+item.reqNum+"&taskNum="+item.taskNum
    }
    
    render(){
        const {tasks}=this.props
        const {tasks_list}=this.state
        return <div className="tasktable_container">{tasks && tasks.length>0?
                    <table className="tasktable">
                        <tr className="task_table_head">
                            <th className="th_cell home_cell"> Task ID </th>
                            <th className="th_cell home_cell"> Task Title </th>
                            <th className="th_cell home_cell"> Task Statement </th>
                            <th></th>
                        </tr>
                        {tasks_list.map((item:any,key:any)=>{
                            if(!item.reqNum){
                                return <tr id={"task_" + item.taskNum} className={item.is_selected?"tl_elem selected_item":"tl_elem"} onClick={()=>this.selectTask(item.taskNum)}>
                                                <td className="tl_cell">{item.taskNum}</td>
                                                <td className="tl_cell">{item.taskTitle}</td>
                                                <td className="tl_cell"> {item.taskStmt} </td>
                                                {item.is_expanded?
                                                <td className="plus_icon" onClick={()=>this.expand_task(item.taskNum)}> - </td>
                                                :<td className="plus_icon" onClick={()=>this.expand_task(item.taskNum)}> + </td>
                                                }
                                        </tr>
                            }
                            else{
                                return <tr id={"req_" + item.reqNum} className="tl_elem" hidden={item.hidden}>
                                                <td className="tl_cell">{item.reqNum}</td>
                                                <td className="tl_cell">{item.reqText}</td>
                                                <td className="tl_cell" onClick={()=>this.showResults(item)}> {"Show Results"} </td>
                                        </tr>
                            }
                        })}
                    </table>
            :''}</div>
    }
  }

export default TaskList;
