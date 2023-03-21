import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    HomeState,
    getTasks,
    decrementCounter,
    add_task,
    submission,
    docDetailPage,
    showEventsPage,
    goBackDetails,
    translateEnglish,
    showAllEvents,
    showAllEventGraph,
    eventSummaryPage
  } from "../store/task";
import ResultComponent from '../components/Result'
  
const mapStateToProps = (state: HomeState) => ({
    tasks: state.tasks,
    add_task_screen:state.add_task_screen,
    docs:state.docs,
    doc_table:state.doc_table,
    show_doc_detail:state.show_doc_detail,
    docitem:state.docitem,
    subRes:state.subRes,
    searchResults:state.searchResults,
    load_sub:state.load_sub,
    doc_key:state.doc_key,
    showEvent:state.showEvent,
    event_types:state.event_types,
    translate_english:state.translate_english,
    showalle:state.showalle,
    showAllEG:state.showAllEventGraph,
    showEventSummary:state.showEventSummary
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    //gettasks: () => dispatch(getTasks()),
    getTasks:()=>getTasks()(dispatch),
    decrementCounter: () => dispatch(decrementCounter()),
    add_task:(t_obj:any)=>add_task(t_obj)(dispatch),
    submission:(taskNum:string,reqNum:string)=>submission(taskNum,reqNum)(dispatch),
    docDetailPage: (docNum:any,key:any)=> dispatch(docDetailPage(docNum,key)),
    showEventsPage: (val:boolean) => dispatch(showEventsPage(val)),
    goBackDetails: () => dispatch(goBackDetails()),
    translateEnglish: (val:boolean) => dispatch(translateEnglish(val)),
    showAllEvents: (val:boolean)=>dispatch(showAllEvents(val)),
    showAllEventGraph:(val:boolean)=>dispatch(showAllEventGraph(val)),
    eventSummaryPage:(val:boolean)=>dispatch(eventSummaryPage(val))

  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResultComponent);