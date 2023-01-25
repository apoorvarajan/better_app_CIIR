import React from 'react'
export const AddTask = () =>{
    return <div className="addtask_container">
    <div className="addtask_sec">
        <div className="new_task_heading">
            Create a New Task
        </div>
        <form className="form_add_task">
            <div className="form_elem_at">
                <label className="form_label_at">
                    Task Title : 
                </label>
                <input type="text" className="form_input_at"/>
            </div>
            <div className="form_elem_at">
                <label className="form_label_at">
                    Task Statement:
                </label>
                <input type="text" className="form_input_at"/>
            </div>
            <div className="form_elem_at form_at_tn">
                <label className="form_label_at">
                    Task Narration:
                </label>
                <textarea className="form_input_at"/>
            </div>
            <div className="form_at_submit_wrap">
                <input type="submit" className="form_at_submit"/>
            </div>
        </form>
    </div>
    </div>
}