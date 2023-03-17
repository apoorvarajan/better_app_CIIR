import React from 'react'
import { translateEnglish } from '../store/task';
import './css/home.css'
import Details from './Details'
class Results extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state={
            low:0,
            up:0,
            filterevent:null,
            resultingList:[]
        }
    }

    componentDidMount(){
        let {submission}=this.props
        //getTasks()
        let urlParams= Object.fromEntries(new URLSearchParams(window.location.search).entries())
        let _this=this
        submission(urlParams.taskNum,urlParams.reqNum).then(()=>{
            let {searchResults}=_this.props
            let pu=0;
            if(searchResults && searchResults.hits && searchResults.hits.length>0){
                if(searchResults.hits.length<10){
                    pu=searchResults.hits.length
                }
                else{
                    pu=10
                }
            }
            _this.setState({
                up:pu,
                resultingList:searchResults.hits
            })
        })
    }
    getDocdetails(docNum:any,key:any){
        this.props.docDetailPage(docNum,key)
    }
    filterFunction(){
        (document.getElementById("myDropdown") as HTMLInputElement).classList.toggle("show");
      }
    eventfilter(event:any){
        const {searchResults}=this.props
        let result=[]
        let pu=10
        if (event=="all"){
            result = searchResults.hits
        }
        else{
            result=searchResults.hits.filter((item:any)=> item.events.some((ev:any)=>{return ev.eventType == event}))
        }
        if(result.length>10){
            pu=10
        }
        else{
            pu=result.length
        }
        (document.getElementById("myDropdown") as HTMLInputElement).classList.remove("show");
        this.setState({
            resultingList:result,
            up:pu,
            low:0
        })
    }
    np_click(val:boolean){
        let {low,up,resultingList}=this.state
        let pu=up
        let ol=low
        if(val){
            if(resultingList.length>=up+10){
                pu=up+10
            }
            else{
                pu=resultingList.length
            }
            ol+=10
        }
        else{
            if(ol>9){
                ol=low-10
            }
            else{
                ol=0
            }
            pu-=10
        }
        this.setState({
            up:pu,
            low:ol
        })
    }
    containsFilter(e:any){
        let {searchResults}=this.props
        let result=[]
        let pu=0
        result=searchResults.hits.filter((item:any)=> item.docText.toLowerCase().includes(e.toLowerCase()) || item.translatedDocText.toLowerCase().includes(e.toLowerCase()))
        if(result.length>10){
            pu=10
        }
        else{
            pu=result.length
        }
        this.setState({
            resultingList:result,
            up:pu,
            low:0
        })
    }
    render(){
        const {tasks,searchResults,load_sub,subRes,docitem, doc_key, showEventsPage, 
            showEvent,goBackDetails,event_types, translateEnglish, translate_english, gobackHome}=this.props
        let today_dt = new Date()
        let date = today_dt.toDateString()
        if (this.props.show_doc_detail){
            return <Details translate_english={translate_english} goBackDetails={goBackDetails} showEvent={showEvent} 
            showEventsPage={showEventsPage} getDocdetails={this.getDocdetails.bind(this)} searchResults={searchResults} 
            subRes={subRes} datestring={date} docitem={docitem} doc_key={doc_key}
            translateEnglish={translateEnglish}/>
        }
        const {low,up,resultingList} = this.state
        let urlParams= Object.fromEntries(new URLSearchParams(window.location.search).entries())
        if (urlParams.reqNum && urlParams.taskNum && tasks){
            let sel_task= tasks.filter((item:any)=>{return item.taskNum === urlParams.taskNum})[0]
            let sel_req = sel_task && sel_task.requests.filter((item:any)=>{return item.reqNum === urlParams.reqNum})[0]
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
                                    {subRes && subRes.taskStmt}
                                </td>
                            </tr>
                            <tr className="row1">
                                <td className="subheading_1">
                                    Request Text:
                                </td>
                                <td className="val1">
                                    {subRes && subRes.reqText}
                                </td>
                            </tr>
                            <tr className="row1">
                                <td className="subheading_1">
                                    Date run:
                                </td>
                                <td className="val1">
                                    {date}
                                </td>
                            </tr>
                        </table>
                        {load_sub?<div className="loading_sub">Please Wait......</div>
                        :<div className="results_wrap">
                            <div className="result-goback-button" onClick={()=>window.location.href="/"}> Go Back </div>
                            <div className="sub_filters">
                                <div className="filter-heading">
                                    Filters
                                </div>
                                <div className="result-filter-wrap">
                                    <div className="dropdown">
                                        <button onClick={()=>this.filterFunction()} className="dropbtn">Event Type</button>
                                        <div id="myDropdown" className="dropdown-content">
                                            <a onClick={()=>this.eventfilter("all")}>All Events</a>
                                            {event_types && event_types.map((item:any)=>{
                                                return <a onClick={()=>this.eventfilter(item)}>{item}</a>
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        Contains: <input  onChange={(e)=>this.containsFilter(e.target.value)}/> in the event
                                        {/* <button className="dropbtn"> Submit </button> */}
                                    </div>
                                    <div>
                                        <input type="checkbox" name="translate" onChange={(e)=> translateEnglish(e.target.checked)} checked={translate_english}/>
                                        <label>Translate to english</label>
                                    </div>
                                </div>
                            </div>
                            {resultingList && resultingList.length>0?
                            <div className="showing_result_text"> 
                                Showing results {low+1} to {up} out of {searchResults.hits.length}
                            </div>:null}
                            <div className="prev-next-buttons">
                                <div>
                                    <div hidden={low >0?false:true} className="details-page-button prev" onClick={()=>this.np_click(false)}>
                                        {"< Previous Page"}
                                    </div>
                                </div>
                                <div>
                                    <div hidden={up<resultingList.length?false:true} className="details-page-button next" onClick={()=>this.np_click(true)}>
                                        {"Next Page >"}
                                    </div>
                                </div>
                            </div>
                            <table className="doc_table">
                                <tr className="task_table_head doc_table_row">
                                    <th className="th_cell">Rank</th>
                                    {/* <th className="th_cell">Document Id</th> */}
                                    <th className="th_cell">Snippet from document</th>
                                    <th></th>
                                </tr>
                                {resultingList && resultingList.length>0 && resultingList.slice(low,up).map((item:any,key:any)=>{
                                    return <tr className="doc_table_row">
                                                <td className="doc_table_col"> {item.Rank} </td>
                                                {/* <td className="doc_table_col">{item.docid}</td> */}
                                                <td className="doc_table_col">{translate_english? item.translatedDocText.slice(0,75)+"............." : item.docText.slice(0,75)+"............."}</td>
                                                <td className="details_button" onClick={()=> this.getDocdetails(item,key)}> Details </td>
                                        </tr>
                                })}
                            </table>
                        </div>}
                    </div>
        }
        else{
            return <div> No req or task numbers</div>
        }
    }
}
export default Results