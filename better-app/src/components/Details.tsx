import React from 'react'
import EventPage from './Event'
class Details extends React.Component<any,any>{
    constructor(props:any){
        super(props)
    }
    np_click(val:boolean){
        let {getDocdetails,searchResults, doc_key}=this.props;
        if(val){
            getDocdetails(searchResults.hits[doc_key+1],doc_key+1)
        }
        else{
            getDocdetails(searchResults.hits[doc_key-1],doc_key-1)
        }
    }
    render(){
        let {props}=this
        return <div> 
                    <div className="header">
                        University of Massachusetts Amherst
                    </div>
                    <div className="site_name">
                        Center for Intelligent Information Retrieval
                    </div>
                    <table className="sub_page_top">
                        <tr className="row1">
                            <td className="subheading_1">
                                Task Statement:
                            </td>
                            <td className="val1">
                                {props && props.subRes ? props.subRes.taskStmt: ""}
                            </td>
                        </tr>
                        <tr className="row1">
                            <td className="subheading_1">
                                Request Text:
                            </td>
                            <td className="val1">
                                {props && props.subRes ? props.subRes.reqText: ""}
                            </td>
                        </tr>
                        <tr className="row1">
                            <td className="subheading_1">
                                Date run:
                            </td>
                            <td className="val1">
                                {props.datestring}
                            </td>
                        </tr>
                        <tr className="row1">
                            <td className="subheading_1">
                                Doc No.:
                            </td>
                            <td className="val1">
                                {props.docitem && props.docitem.docid}
                            </td>
                        </tr>
                        <tr className="row1">
                            <td className="subheading_1">
                                Rank:
                            </td>
                            <td className="val1">
                                {props.doc_key}
                            </td>
                        </tr>
                    </table>
                    {props.showEvent ? <EventPage doc_key={props.doc_key} events={props.docitem.events} showEventsPage={props.showEventsPage}/>
                    :<div>
                    <div className="highlight-filter">
                        <div className="highlight-head">
                            HIGHLIGHT:
                        </div>
                        <div className="highlight-items">
                            <div className="highlight-item">
                                <input type="checkbox" name="taskterms"/>
                                <label>Task terms</label>
                            </div>
                            <div className="highlight-item">
                                <input type="checkbox" name="requestterms"/>
                                <label>Request terms</label>
                            </div>
                            <div className="dropdown highlight-item">
                                <button onClick={()=>{}} className="dropbtn">Event Type</button>
                                    <div id="myDropdown" className="dropdown-content">
                                        <a href="#allevents">All Events</a>
                                        <a href="#ev1">Event 1</a>
                                        <a href="#ev2">Event 2</a>
                                        <a href="#ev3">Event 3</a>
                                        <a href="#ev4">Event 4</a>
                                    </div>
                            </div>
                        </div>
                        <div className="highlight-items">
                        <input type="checkbox" name="translate"/>
                        <label>Translate to english</label>
                    </div>
                    </div>
                    <div className="docText">
                        {props.docitem.docText}
                    </div>
                    <div className="see_events_button" onClick={()=>props.showEventsPage(true)}>
                        See Events in the Document
                    </div>
                    <div className="prev-next-buttons">
                        {props.doc_key >0 && <div className="details-page-button" onClick={()=>this.np_click(false)}>
                            {"< Previous doc"}
                        </div>}
                        {props.doc_key<props.searchResults.hits.length && <div className="details-page-button" onClick={()=>this.np_click(true)}>
                            {"Next doc >"}
                        </div>}
                    </div>
                    </div>}
                </div>
    }
}
export default Details