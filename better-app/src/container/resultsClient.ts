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
    goBackDetails
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
    event_types:state.event_types
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    //gettasks: () => dispatch(getTasks()),
    getTasks:()=>getTasks()(dispatch),
    decrementCounter: () => dispatch(decrementCounter()),
    add_task:(t_obj:any)=>add_task(t_obj)(dispatch),
    submission:(taskNum:string,reqNum:string)=>submission(taskNum,reqNum)(dispatch),
    docDetailPage: (docNum:any,key:any)=> dispatch(docDetailPage(docNum,key)),
    showEventsPage: (val:boolean) => dispatch(showEventsPage(val)),
    goBackDetails: () => dispatch(goBackDetails())

  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResultComponent);