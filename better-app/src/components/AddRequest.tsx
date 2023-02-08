import React from 'react'
const add_request_click=(e:any,props:any)=>{
    e.preventDefault()
    let at_obj = Object.fromEntries(new FormData(e.target))
    props.add_request(at_obj)
}
export const AddRequest = (props:any) =>{
    return <div className="addtask_container">
        <table className="sub_page_top">
                            <tr className="row1">
                                <td className="subheading_1">
                                    Task Statement:
                                </td>
                                <td className="val1">
                                    {props.sel_task && props.sel_task.taskStmt}
                                </td>
                            </tr>
        </table>
    <div className="addtask_sec">
        <div className="new_task_heading">
            Create Request
        </div>
        <form id="at_form" className="form_add_task" onSubmit={(e)=>add_request_click(e,props)}>
            <div className="form_elem_at">
                <label className="form_label_at">
                    Request Text : 
                </label>
                <input id="tT_at" type="text" className="form_input_at" required name="reqText"/>
            </div>
            <div className="form_at_submit_wrap">
                <div className="cancel_add_task" onClick={()=>props.add_request_screen(false)}>Cancel</div>
                <input type="submit" className="form_at_submit"/>
            </div>
        </form>
    </div>
    </div>
}