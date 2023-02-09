import React from 'react'
import './css/home.css'
class Results extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state={
            low:0,
            up:0
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
                up:pu
            })
        })
    }
    getDocdetails(docNum:any,key:any){
        this.props.docDetailPage(docNum)
    }
    filterFunction(){
        (document.getElementById("myDropdown") as HTMLInputElement).classList.toggle("show");
      }
    render(){
        if (this.props.show_doc_detail){
            return <div>
                Show Doc Detail Page: {this.props.docNum}
            </div>
        }
        const {tasks,doc_table, searchResults, sR_page}=this.props
        const {low,up} = this.state
        let urlParams= Object.fromEntries(new URLSearchParams(window.location.search).entries())
        if (urlParams.reqNum && urlParams.taskNum && tasks){
            let sel_task= tasks.filter((item:any)=>{return item.taskNum === urlParams.taskNum})[0]
            let sel_req = sel_task && sel_task.requests.filter((item:any)=>{return item.reqNum === urlParams.reqNum})[0]
            let today_dt = new Date()
            let date = today_dt.toDateString()
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
                                    {sel_task && sel_task.taskStmt}
                                </td>
                            </tr>
                            <tr className="row1">
                                <td className="subheading_1">
                                    Request Text:
                                </td>
                                <td className="val1">
                                    {sel_req && sel_req.reqText}
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
                        <div className="sub_filters">
                            <div className="filter-heading">
                                Filters
                            </div>
                            <div className="dropdown">
                                <button onClick={()=>this.filterFunction()} className="dropbtn">Event Type</button>
                                <div id="myDropdown" className="dropdown-content">
                                    <a href="#allevents">All Events</a>
                                    <a href="#ev1">Event 1</a>
                                    <a href="#ev2">Event 2</a>
                                    <a href="#ev3">Event 3</a>
                                    <a href="#ev4">Event 4</a>
                                </div>
                            </div>
                            <div>
                                Contains: <input  /> in the event
                                {/* <button className="dropbtn"> Submit </button> */}
                            </div>
                        </div>
                        <table className="doc_table">
                            <tr className="task_table_head doc_table_row">
                                <th className="th_cell">SN</th>
                                <th className="th_cell">Document Id</th>
                                <th className="th_cell">Snippet from document</th>
                                <th></th>
                            </tr>
                            {searchResults && searchResults.hits && searchResults.hits.length>0 && searchResults.hits.slice(low,up).map((item:any,key:any)=>{
                                return <tr className="doc_table_row">
                                            <td className="doc_table_col"> {key+1 || "No."} </td>
                                            <td className="doc_table_col">{item.docid}</td>
                                            <td className="doc_table_col">{item.docText.slice(0,75)+"............."}</td>
                                            <td className="details_button" onClick={()=> this.getDocdetails(item.docNum,key)}> Details </td>
                                    </tr>
                            })}
                        </table>
                    </div>
        }
        else{
            return <div> No req or task numbers</div>
        }
    }
}
export default Results