import React from 'react'
import EventGraph from './EventGraph'
class EventPage extends React.Component<any,any>{
    constructor(props:any){
        super(props)
        this.state={
            showEventGraph:false
        }
    }
    showEventG(){
        this.setState({
            showEventGraph:true
        })
    }
    render(){
        let {events,showEventsPage}=this.props;
        let {showEventGraph}=this.state
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
                            <td className="tl_cell event_th_cell"> {item.agentSpanList && item.agentSpanList.length>0 ? item.agentSpanList.map((item2:any,key:any)=> item2.string+(key!=0?",":"")):"None"} </td>
                            <td className="tl_cell event_th_cell">{item.anchorSpan.string}</td>
                            <td className="tl_cell event_th_cell">
                                {item.patientSpanList && item.patientSpanList.length>0 ? item.patientSpanList.map((item2:any,key:any)=> item2.string+(key!=0?",":"")):"None"}
                            </td>
                        </tr>
                    })}
                </table>
                {showEventGraph ? <EventGraph/> : null}
                <div className="event-bottom">
                    {!showEventGraph? <div className="event-bottom-button" onClick={()=> this.showEventG()}>
                        Event Graph
                    </div>: null}
                    <div className="event-bottom-button" onClick={()=>showEventsPage(false)}> Go Back </div>
                </div>
            </div>
    }
}

export default EventPage