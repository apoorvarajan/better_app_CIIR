import React from 'react'
import EventGraph from './EventGraph'
class EventSummary extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state={
            graph_input:null,
            subcategory:null,
            selected_category:null,
            selected_cat_value:null,
            selected_sub:null,
            selected_sub_value:null
        }
    }
    actorSelect(item:any,type:string){
        let _this=this
        let summary=item.value.reduce((a:any,c:any)=>{
            a[c.eventType]=a[c.eventType] || []
            a[c.eventType].push(c)
            return a;
        },Object.create(null)) 
        let sorted_summary = Object.keys(summary)
                                    .map(function(k) { return { key: k, value: summary[k] }; })
                                    .sort(function(a, b) { return b.value.length - a.value.length; });
        this.setState({
            subcategory:sorted_summary,
            selected_category:type,
            selected_cat_value:item.key,
            selected_sub:null,
            selected_sub_value:null
        },()=>{
            _this.itemSelect(item,type)
        })
    }
    itemSelect(item:any,type:string){
        let {selected_cat_value}=this.state
            // let obj:any=[]
            // item.value.map((item:any,key:any)=>{
            //     obj.push({
            //         'agent':item.agent,
            //         'anchor':item.anchor,
            //         'patient':item.patient,
            //     })
            // })
        let graph:any = {
            'nodes':[],
            'links':[]
        }
        let id_temp=0
        item.value.map((item2:any,key:any)=>{
            if(!graph.nodes.some((object:any)=>object.name==item2.agent)){
                graph['nodes'].push({
                    "id":id_temp,
                    "name":item2.agent
                })
                id_temp+=1
            }
            if(!graph.nodes.some((object:any)=>object.name==item2.patient)){
                graph['nodes'].push({
                    "id":id_temp,
                    "name":item2.patient
                })
                id_temp+=1
            }
            let srcid = graph.nodes.find((elem:any)=>elem.name==item2.agent).id
            let dstid = graph.nodes.find((elem:any)=>elem.name==item2.patient).id
            graph.links.push({
                "source": srcid,
                "target": dstid,
                "relation":item2.anchor
            })
        })
        this.setState({
            graph_input:graph,
            selected_category:type,
            selected_cat_value:type=="event"?item.key:selected_cat_value,
            selected_sub:type=='event'?null:item.key,
            // selected_sub_value:type=="event"?null:item.
        })
    }
    render(){
        let {events,translate_english, eventSummaryPage}=this.props
        let {graph_input,subcategory,selected_category,selected_cat_value,selected_sub,selected_sub_value}=this.state
        // let event_cat=events.reduce((a:any,c:any)=>{
        //     a[c.eventType] = a[c.eventType] || [];
        //         a[c.eventType].push(c);
        //         return a;
        //     }, Object.create(null));
            let obj:any=[]
            events.map((item:any,key:any)=>{
                if(item && item.agentSpanList && item.agentSpanList.length>0){
                    item.agentSpanList.map((agent:any)=>{
                        if(item.patientSpanList && item.patientSpanList.length>0){
                            item.patientSpanList.map((patient:any)=>{
                                obj.push({
                                    'agent':translate_english ? agent.translatedString: agent.string,
                                    'anchor': translate_english ? item.anchorSpan.translatedString: item.anchorSpan.string,
                                    'eventType': item.eventType,
                                    'patient':translate_english ? patient. translatedString : patient.string,
                                })
                            })
                        }
                        // else{
                        //     obj.push({
                        //         'agent':agent.string,
                        //         'anchor': item.anchorSpan.string,
                        //         'eventType': item.eventType,
                        //         'patient':'None',
                        //     })
                        // }
                    })
                }
                // else{
                //     if(item.patientSpanList && item.patientSpanList.length>0){
                //         item.patientSpanList.map((patient:any)=>{
                //             if(!item.agentSpanList || item.agentSpanList.length==0)
                //                 obj.push({
                //                     'agent':'None',
                //                     'anchor': item.anchorSpan.string,
                //                     'eventType': item.eventType,
                //                     'patient':patient.string,
                //                 })
                //         })
                //     }
                // }   
            })
            let eventType_summary=obj.reduce((a:any,c:any)=>{
                a[c.eventType]=a[c.eventType] || []
                a[c.eventType].push(c)
                return a;
            },Object.create(null))
            let agent_summary=obj.reduce((a:any,c:any)=>{
                a[c.agent]=a[c.agent] || []
                a[c.agent].push(c)
                return a;
            },Object.create(null))
            let patient_summary=obj.reduce((a:any,c:any)=>{
                a[c.patient]=a[c.patient] || []
                a[c.patient].push(c)
                return a;
            },Object.create(null))
            let anchor_summary=obj.reduce((a:any,c:any)=>{
                a[c.anchor]=a[c.anchor] || []
                a[c.anchor].push(c)
                return a;
            },Object.create(null))
            let sorted_eventarray = Object.keys(eventType_summary)
                                    .map(function(k) { return { key: k, value: eventType_summary[k] }; })
                                    .sort(function(a, b) { return b.value.length - a.value.length; });
            let sorted_agentarray = Object.keys(agent_summary)
                                    .map(function(k) { return { key: k, value: agent_summary[k] }; })
                                    .sort(function(a, b) { return b.value.length - a.value.length; });
            let sorted_patientarray = Object.keys(patient_summary)
                                    .map(function(k) { return { key: k, value: patient_summary[k] }; })
                                    .sort(function(a, b) { return b.value.length - a.value.length; });
            let sorted_anchorarray = Object.keys(anchor_summary)
                                    .map(function(k) { return { key: k, value: anchor_summary[k] }; })
                                    .sort(function(a, b) { return b.value.length - a.value.length; });

        return <div>
            <div className="result-goback-button allevent-button" onClick={()=>eventSummaryPage(false)}> Go Back </div>
            <div className="summary_wrap">
                <div className="each_sum">
                    <div className="sum_type">Event Type Summary</div>
                    <div className="sum_elem">
                        {sorted_eventarray.map((item:any,key:any)=>{
                            return <div id={"event_"+key} className="item_sum" onClick={()=>this.itemSelect(item,"event")}>{item.key+":"+item.value.length}</div>
                        })}
                    </div>
                </div>
                <div className="each_sum">
                    <div className="sum_type">Agent Summary</div>
                    <div className="sum_elem">
                    {sorted_agentarray.map((item:any,key:any)=>{
                        return <div id={"agent_"+key}className="item_sum" onClick={()=>this.actorSelect(item,"agent")}>{item.key+":"+item.value.length}</div>
                    })}
                    </div>
                </div>
                <div className="each_sum">
                    <div className="sum_type">Patient Summary</div>
                    <div className="sum_elem">
                    {sorted_patientarray.map((item:any,key:any)=>{
                        return <div id={"patient_"+key} className="item_sum" onClick={()=>this.actorSelect(item,"patient")}>{item.key+":"+item.value.length}</div>
                    })}
                    </div>
                </div>
                <div className="each_sum">
                    <div className="sum_type">Anchor Summary</div>
                    <div className="sum_elem">
                    {sorted_anchorarray.map((item:any,key:any)=>{
                        return <div id={"anchor_"+key} className="item_sum" onClick={()=>this.actorSelect(item,"anchor")}>{item.key+":"+item.value.length}</div>
                    })}
                    </div>
                </div>
            </div>
            <div className="subcategory">
                {subcategory?subcategory.map((item:any,key:any)=>{
                    return <div id={"sub_"+key} className="subcategory_elem" onClick={()=>this.itemSelect(item,selected_category)}>
                        {item.key+":"+item.value.length}
                    </div>
                }):null}
            </div>
            <div>
                <div>
                    {(selected_category ? "Selected Category : " + selected_category + " ":"")}
                </div>
                <div>
                    {(selected_cat_value ? "Selected Category Value : " + selected_cat_value + " ":"")}
                </div>
                <div>
                    {(selected_sub ?"Selected Sub Category : "+ selected_sub + " ":"")}
                </div>
                <div>
                    {(selected_sub_value ? "Selected Sub Category Value : " + selected_sub_value + " ":"")}
                </div>
                {graph_input? <EventGraph translate_english={translate_english} graph_input={graph_input} summary={true}/>:null}
            </div>
            </div>
    }
}

export default EventSummary