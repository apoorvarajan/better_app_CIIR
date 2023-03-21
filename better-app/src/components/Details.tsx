import React from 'react'
import EventPage from './Event'
import { removeStopwords} from 'stopword'
import EventGraph from './EventGraph'

class Details extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state={
            task_highlight:false,
            request_highlight:false,
            text_highlight:"",
            event_highlight:"",
            showEventGraph:false
        }
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    wrapperRef:any = React.createRef();
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    showEventG(val:boolean){
        this.setState({
            showEventGraph:val
        })
    } 
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside(event:any) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            (document.getElementById("myDropdownDetails") as HTMLInputElement).classList.remove("show");
        }
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
    highlight(){
        let {props,state}=this
        let {task_highlight,request_highlight,text_highlight,event_highlight}=state
        let doc = props.translate_english? props.docitem.translatedDocText : props.docitem.docText
        let inputText:any = document.getElementById("detailsDocText")
        let text = doc.replaceAll(text_highlight,`<span class='highlight_text'>${text_highlight}</span>`);
        let {subRes}=this.props
        let taskterms = removeStopwords(subRes.taskStmt.split(" "))
        taskterms.map((item)=>{
            let taskregex = new RegExp(/\b + item + \b/, 'gi')
            text = text.replaceAll(taskregex,`<span class='highlight_task'>$1</span>`)
        })
        inputText.innerHTML=text
    }
    containsFilter(e:any){
        let {props}=this
        let doc = props.translate_english? props.docitem.translatedDocText : props.docitem.docText
        let inputText:any = document.getElementById("detailsDocText")
        let text = doc.replaceAll(e,`<span class='highlight_text'>${e}</span>`);
        inputText.innerHTML=text
    }
    filterFunction(){
        (document.getElementById("myDropdownDetails") as HTMLInputElement).classList.toggle("show");
    }
    eventfilter(event:any){
        let high_classes = document.getElementsByClassName("highlight_event")
        while(high_classes.length>0){
            high_classes[0].className=""
        }
        const {docitem}=this.props
        let result=[]
        if (event=="all"){
            result = docitem.events.map((item:any)=> item.anchorSpan.string)
        }
        else if(event=="none"){
            result=[]
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
        this.setState({
            event_highlight:event
        })
        
    }
    taskterms(e:any){
        if(e.target.checked){
            let {subRes}=this.props
            let taskterms = removeStopwords(subRes.taskStmt.split(" "))
            //taskterms = taskterms.map((item:any)=> item!=""?" "+item+" ":null)
            let inputText = document.getElementById("detailsDocText")
            let innerHTML:any = inputText?.innerHTML
            for(let i=0;i<taskterms.length;i++){
                let index:any = innerHTML?.indexOf(taskterms[i])
                let re = new RegExp('[A-Za-z0-9]')
                if(index && index>=0 && inputText && !(re.test(innerHTML?.substring(index-1,index)) || re.test(innerHTML?.substring(index+taskterms[i].length,index+taskterms[i].length+1)))){
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
            let reqterms = removeStopwords(subRes.reqText.split(" "))
            //reqterms = reqterms.map((item:any)=> item!="" ? " "+item+" ":null)
            let inputText = document.getElementById("detailsDocText")
            let innerHTML:any = inputText?.innerHTML
            for(let i=0;i<reqterms.length;i++){
                let index = innerHTML?.indexOf(reqterms[i])
                let re = new RegExp('[A-Za-z0-9]')
                if(index && index>=0 && inputText && !(re.test(innerHTML?.substring(index-1,index)) || re.test(innerHTML?.substring(index+reqterms[i].length,index+reqterms[i].length+1)))){
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
        let {translate_english}=props;
        let {showEventGraph}=this.state
        let event_list: any = []
        for(let j=0; j<props.docitem.events.length;j++){
            if(!event_list.includes(props.docitem.events[j].eventType)){
                event_list.push(props.docitem.events[j].eventType)
            }
        }
        return <div> 
                    <div className="header">
                        UMass Amherst, Center for Intelligent Information Retrieval, CLEAR team
                    </div>
                    {/* <div className="site_name">
                        Center for Intelligent Information Retrieval
                    </div> */}
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
                        {/* <tr className="row1">
                            <td className="subheading_1">
                                Doc No.:
                            </td>
                            <td className="val1">
                                {props.docitem && props.docitem.docid}
                            </td>
                        </tr> */}
                        <tr className="row1">
                            <td className="subheading_1">
                                Rank:
                            </td>
                            <td className="val1">
                                {props.docitem.Rank}
                            </td>
                        </tr>
                    </table>
                    {showEventGraph ? <EventGraph translateEnglish={props.translateEnglish} translate_english={translate_english} events={props.docitem.events} showEventG={this.showEventG.bind(this)}/> :
                    props.showEvent ? <EventPage translateEnglish={props.translateEnglish} translate_english={translate_english} doc_key={props.doc_key} events={props.docitem.events} showEventsPage={props.showEventsPage}/>
                    :<div>
                    <div className="highlight-filter">
                        <div className="highlight-items">
                            <div className="high_inside">
                                <div className="highlight-head">
                                    HIGHLIGHT:
                                </div>
                                <div className="highlight-item">
                                    <input type="checkbox" name="taskterms" onChange={(e:any)=>this.taskterms(e)}/>
                                    <label>Show task statement terms</label>
                                </div>
                                <div className="highlight-item">
                                    <input type="checkbox" name="requestterms" onChange={(e:any)=>this.requestterms(e)}/>
                                    <label>Show request title terms</label>
                                </div>
                                <div className="dropdown highlight-item" ref={this.wrapperRef}>
                                    <button onClick={()=>this.filterFunction()} className="dropbtn">
                                        {this.state.event_highlight!="none" ? "Filter by event Type: "+this.state.event_highlight:"Filter by event Type"}
                                    </button>
                                        <div id="myDropdownDetails" className="dropdown-content details-width">
                                            <a onClick={()=>this.eventfilter("all")}>All Events</a>
                                                {event_list && event_list.map((item:any)=>{
                                                    return <a onClick={()=>this.eventfilter(item)}>{item}</a>
                                            })}
                                            <a onClick={()=>this.eventfilter("none")}>None</a>
                                        </div>
                                </div>
                        </div>
                        {/* <div className="highlight-items"> */}
                        <div className="filter-details">
                            <div>
                                <input type="checkbox" name="translate" checked={props.translate_english} onChange={(e)=> props.translateEnglish(e.target.checked)}/>
                                <label>Translate to english</label>
                            </div>
                            <div  className="search-input">
                                Highlight: <input onChange={(e)=>this.containsFilter(e.target.value)}/> in the document
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="prev-next-buttons">
                        <div>
                            <div hidden={props.doc_key >0?false:true} className="details-page-button prev" onClick={()=>this.np_click(false)}>
                                {"< Previous doc"}
                            </div>
                        </div>
                        <div>
                            <div hidden={props.searchResults && props.doc_key<props.searchResults.hits.length?false:true} className="details-page-button next" onClick={()=>this.np_click(true)}>
                                {"Next doc >"}
                            </div>
                        </div>
                    </div>
                    <div className="details_bottom_buttons">
                        <div className="see_events_button" onClick={()=> props.goBackDetails()}>
                            Back To Search Results
                        </div>
                        {!showEventGraph? <div className="see_events_button" onClick={()=> this.showEventG(true)}>
                            Show event graph
                        </div>: null}
                        <div className="see_events_button" onClick={()=>props.showEventsPage(true)}>
                            See Events in the Document
                        </div>
                    </div>
                    <div className="docText" id="detailsDocText">
                        {props.translate_english? props.docitem.translatedDocText : props.docitem.docText}
                    </div>
                    </div>}
                </div>
    }
}
export default Details