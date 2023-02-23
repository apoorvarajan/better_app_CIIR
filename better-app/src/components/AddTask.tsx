import React from 'react'
const add_task_click=(e:any,props:any)=>{
    e.preventDefault()
    let at_obj = Object.fromEntries(new FormData(e.target))
    props.add_task(at_obj)
}
export const AddTask = (props:any) =>{
    
    return <div className="addtask_container">
    <div className="addtask_sec">
        <div className="new_task_heading">
            Create a New Task
        </div>
        <form id="at_form" className="form_add_task" onSubmit={(e)=>add_task_click(e,props)}>
            <div className="form_elem_at">
                <label className="form_label_at">
                    Task Title : 
                </label>
                <input id="tT_at" type="text" className="form_input_at" required name="taskTitle"/>
            </div>
            <div className="form_elem_at">
                <label className="form_label_at">
                    Task Statement:
                </label>
                <input id="tS_at" type="text" className="form_input_at" required name="taskStmt"/>
            </div>
            <div className="form_elem_at form_at_tn">
                <label className="form_label_at">
                    Task Narration:
                </label>
                <textarea id="tN_at" className="form_input_at form_at_textarea" required name="taskNarr"/>
            </div>
            <div className="form_at_submit_wrap">
                <div className="cancel_add_task" onClick={()=>props.add_task_screen(false)}>Cancel</div>
                <input type="submit" className="form_at_submit"/>
            </div>
        </form>
    </div>
    </div>
}