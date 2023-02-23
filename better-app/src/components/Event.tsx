import React from 'react'
class EventPage extends React.Component<any,any>{
    constructor(props:any){
        super(props)
    }
    render(){
        let {events,showEventsPage}=this.props;
        return <div>
                <table className="tasktable event_table">
                    <tr className="task_table_head">
                        <th className="th_cell event_th_cell"> Event Type</th>
                        <th className="th_cell event_th_cell"> Agent </th>
                        <th className="th_cell event_th_cell"> Anchor </th>
                        <th className="th_cell event_th_cell"> Patient </th>
                    </tr>
                    {events.map((item:any,key:any)=>{
                        return <tr className={key%2==0?"tl_elem light":"tl_elem dark"}>
                            <td className="tl_cell event_th_cell">{item.eventType}</td>
                            <td className="tl_cell event_th_cell"> ? </td>
                            <td className="tl_cell event_th_cell">{item.anchorSpan.string}</td>
                            <td className="tl_cell event_th_cell">?</td>
                        </tr>
                    })}
                </table>
                <div className="event-bottom">
                    <div className="event-bottom-button">
                        Event Graph
                    </div>
                    <div className="event-bottom-button" onClick={()=>showEventsPage(false)}> Go Back </div>
                </div>
            </div>
    }
}

export default EventPage