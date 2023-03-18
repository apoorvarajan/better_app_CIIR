import React from 'react'
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
const { useRef } = React;

class EventGraph extends React.Component<any,any>{
    constructor(props:any){
        super(props)
        this.state={
            graphobj:null
        }
    }
    componentDidMount(){
        let {events} = this.props
        let obj:any=[]
        events.map((item:any,key:any)=>{
            if(item && item.agentSpanList && item.agentSpanList.length>0){
                item.agentSpanList.map((agent:any)=>{
                    if(item.patientSpanList && item.patientSpanList.length>0){
                        item.patientSpanList.map((patient:any)=>{
                            if(agent.string && agent.string!="")
                            obj.push({
                                'agent':agent.string,
                                'anchor':item.eventType + "("+item.anchorSpan.string +")",
                                'patient':patient.string,
                            })
                        })
                    }
                })

            }   
        })
        let graph:any = {
            'nodes':[],
            'links':[]
        }
        let id_temp=0
        obj.map((item:any,key:any)=>{
            if(!graph.nodes.some((object:any)=>object.name==item.agent)){
                graph['nodes'].push({
                    "id":id_temp,
                    "name":item.agent
                })
                id_temp+=1
            }
            if(!graph.nodes.some((object:any)=>object.name==item.patient)){
                graph['nodes'].push({
                    "id":id_temp,
                    "name":item.patient
                })
                id_temp+=1
            }
            let srcid = graph.nodes.find((elem:any)=>elem.name==item.agent).id
            let dstid = graph.nodes.find((elem:any)=>elem.name==item.patient).id
            graph.links.push({
                "source": srcid,
                "target": dstid,
                "relation":item.anchor
            })
        })
        this.setState({
            graphobj:graph
        })
    }
    render(){
        let {graphobj}=this.state
        let {allevents,showEventsPage,showEventG}=this.props;
        if(graphobj)
        {
            const Graph = () => {
                const fgRef:any = useRef<ForceGraphMethods>(null);
                React.useEffect(() => {
                    if(fgRef.current){
                        fgRef.current.d3Force('charge').strength(-250);
                        fgRef.current.d3Force('center').strength(0.8);
                        fgRef.current.d3Force('link').distance(100);
                        fgRef.current.d3Force('collision', null);
                        fgRef.current.d3Force('radial', null);
                    }
                }, []);
                return <ForceGraph2D
                            //dagMode={'radialout'}
                            dagLevelDistance={500}
                            d3VelocityDecay={0.7}
                        //     d3AlphaDecay={0}
                        // d3VelocityDecay={0}
                            cooldownTime={Infinity}
                            graphData={graphobj}
                            linkAutoColorBy={(d:any)=>d.relation}
                            nodeRelSize={10}
                            linkDirectionalArrowLength={10}
                            linkDirectionalArrowRelPos={1}
                            linkCurvature={0}
                            width={1200}
                            height={700}
                            backgroundColor={"white"}
                            nodeColor={()=>"black"}
                            ref={fgRef}
                            cooldownTicks={100}
                            onEngineStop={() => fgRef.current.zoomToFit(400)}
                            linkLineDash={(link) => link === graphobj.links[0] ? [50, 50] : [5, 0]}
                            //linkColor={()=>"#881c1c"}
                            nodeVisibility={true}
                            linkLabel={'relation'}
                            linkWidth={0.9}
                            //dagLevelDistance={2}
                            //linkOpacity={1}
                            
                            nodeAutoColorBy="name"
                            nodeCanvasObject={(node:any, ctx:any, globalScale:any) => {
                                const label = node.name;
                                const fontSize = 15 //12//globalScale;
                                ctx.font = `${fontSize}px Sans-Serif`;
                                const textWidth = ctx.measureText(label).width;
                                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 1); // some padding
                    
                                ctx.fillStyle = 'white' //'rgba(255, 255, 255, 0.8)';
                                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);
                    
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillStyle = 'black' //node.color;
                                ctx.fillText(label, node.x, node.y);
                    
                                node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                              }}
                              nodePointerAreaPaint={(node:any, color:any, ctx:any) => {
                                ctx.fillStyle = color;
                                const bckgDimensions = node.__bckgDimensions;
                                bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2,bckgDimensions[0], bckgDimensions[1]);
                              }}
                              linkCanvasObjectMode={(() => 'after')}
                              linkCanvasObject={(link:any, ctx) => {
                                const MAX_FONT_SIZE = 5;
                                const LABEL_NODE_MARGIN = 2//Graph.nodeRelSize() * 1.5;
                      
                                const start:any = link.source;
                                const end:any = link.target;
                      
                                // ignore unbound links
                                if (typeof start !== 'object' || typeof end !== 'object') return;
                      
                                // calculate label positioning
                                const textPos = Object.assign(['x', 'y'].map(c => ({
                                  [c]: start[c] + (end[c] - start[c]-10) / 2 // calc middle point
                                }))[0],['x', 'y'].map(c => ({
                                    [c]: start[c] + (end[c] - start[c]-5) / 2 // calc middle point
                                  }))[1]);
                      
                                const relLink = { x: end.x - start.x, y: end.y - start.y };
                      
                                const maxTextLength = Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) - LABEL_NODE_MARGIN * 2;
                      
                                let textAngle = Math.atan2(relLink.y, relLink.x);
                                // maintain label vertical orientation for legibility
                                if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
                                if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);
                      
                                const label = `${link.relation}`//`${link.source.id} > ${link.target.id}`;
                      
                                // estimate fontSize to fit in link length
                                ctx.font = '1px Sans-Serif';
                                const fontSize = Math.min(MAX_FONT_SIZE, maxTextLength / ctx.measureText(label).width);
                                ctx.font = `${fontSize}px Sans-Serif`;
                                const textWidth = ctx.measureText(label).width;
                                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
                                // draw text label (with background rect)
                                ctx.save();
                                ctx.translate(textPos.x, textPos.y);
                                ctx.rotate(textAngle);
                      
                                ctx.fillStyle = 'white'//'rgba(255, 255, 255, 0.8)';
                                ctx.fillRect(- bckgDimensions[0] / 2, - bckgDimensions[1] / 2, bckgDimensions[0],bckgDimensions[1]);
                      
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillStyle = '#881c1c';
                                ctx.fillText(label, 0, 0);
                                ctx.restore();
                            }}
                        />
            }
            return <div className="eventgraph-page">
                        <div className="result-goback-button allevent-button" onClick={()=>allevents?showEventsPage(false):showEventG(false)}> Go Back </div>
                        <div className="wrap-event-graph">
                            <Graph/>
                        </div>
                    </div>
        }
        else{
            return null
        }
    }
}

export default EventGraph