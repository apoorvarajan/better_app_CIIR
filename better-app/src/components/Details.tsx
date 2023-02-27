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
    filterFunction(){
        (document.getElementById("myDropdownDetails") as HTMLInputElement).classList.toggle("show");
      }
      eventfilter(event:any){
        const {docitem}=this.props
        let result=[]
        if (event=="all"){
            result = docitem.events.map((item:any)=> item.anchorSpan.string)
        }
        else{
            result=docitem.events.map((item:any)=> item.eventType == event && item.anchorSpan.string)
        }
        (document.getElementById("myDropdownDetails") as HTMLInputElement).classList.remove("show");
        let inputText = document.getElementById("detailsDocText")
        let innerHTML = inputText?.innerHTML
        for(let i=0;i<result.length;i++){
            let index = innerHTML?.indexOf(result[i])
            if(index && index>=0 && inputText){
                innerHTML = innerHTML?.substring(0,index) + "<span class='highlight_event'>" + innerHTML?.substring(index,index+result[i].length) + "</span>" + innerHTML?.substring(index + result[i].length);
                inputText.innerHTML = innerHTML;
            }
        }
        
    }
    taskterms(e:any){
        if(e.target.checked){
            let {subRes}=this.props
            let taskterms = subRes.taskStmt.split(" ")
            taskterms = taskterms.map((item:any)=> item!=""?" "+item+" ":null)
            let inputText = document.getElementById("detailsDocText")
            let innerHTML = inputText?.innerHTML
            for(let i=0;i<taskterms.length;i++){
                let index = innerHTML?.indexOf(taskterms[i])
                if(index && index>=0 && inputText){
                    innerHTML = innerHTML?.substring(0,index) + "<span class='highlight_task'>" + innerHTML?.substring(index,index+taskterms[i].length) + "</span>" + innerHTML?.substring(index + taskterms[i].length);
                    inputText.innerHTML = innerHTML;
                }
            }
        }
        else{
            let high_classes = document.getElementsByClassName("highlight_task")
            while(high_classes.length>0){
                high_classes[0].className=""
            }
        }
    }
    requestterms(e:any){
        let {subRes}=this.props
        if(e.target.checked){
            let {subRes}=this.props
            let reqterms = subRes.reqText.split(" ")
            reqterms = reqterms.map((item:any)=> item!="" ? " "+item+" ":null)
            let inputText = document.getElementById("detailsDocText")
            let innerHTML = inputText?.innerHTML
            for(let i=0;i<reqterms.length;i++){
                let index = innerHTML?.indexOf(reqterms[i])
                if(index && index>=0 && inputText){
                    innerHTML = innerHTML?.substring(0,index) + "<span class='highlight_request'>" + innerHTML?.substring(index,index+reqterms[i].length) + "</span>" + innerHTML?.substring(index + reqterms[i].length);
                    inputText.innerHTML = innerHTML;
                }
            }
        }
        else{
            let high_classes = document.getElementsByClassName("highlight_request")
            while(high_classes.length>0){
                high_classes[0].className=""
            }
        }
    }
    render(){
        let {props}=this
        let event_list: any = []
        for(let j=0; j<props.docitem.events.length;j++){
            if(!event_list.includes(props.docitem.events[j].eventType)){
                event_list.push(props.docitem.events[j].eventType)
            }
        }
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
                                {props.docitem.Rank}
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
                                <input type="checkbox" name="taskterms" onChange={(e:any)=>this.taskterms(e)}/>
                                <label>Task terms</label>
                            </div>
                            <div className="highlight-item">
                                <input type="checkbox" name="requestterms" onChange={(e:any)=>this.requestterms(e)}/>
                                <label>Request terms</label>
                            </div>
                            <div className="dropdown highlight-item">
                                <button onClick={()=>this.filterFunction()} className="dropbtn">Event Type</button>
                                    <div id="myDropdownDetails" className="dropdown-content details-width">
                                        <a onClick={()=>this.eventfilter("all")}>All Events</a>
                                            {event_list && event_list.map((item:any)=>{
                                                return <a onClick={()=>this.eventfilter(item)}>{item}</a>
                                        })}
                                    </div>
                            </div>
                        </div>
                        <div className="highlight-items">
                        <input type="checkbox" name="translate" checked={props.translate_english} onChange={(e)=> props.translateEnglish(e.target.checked)}/>
                        <label>Translate to english</label>
                    </div>
                    </div>
                    <div className="docText" id="detailsDocText">
                        {props.translate_english? props.docitem.translatedDocText : props.docitem.docText}
                    </div>
                    <div className="details_bottom_buttons">
                        <div className="see_events_button" onClick={()=> props.goBackDetails()}>
                            Submissions Page
                        </div>
                        <div className="see_events_button" onClick={()=>props.showEventsPage(true)}>
                            See Events in the Document
                        </div>
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