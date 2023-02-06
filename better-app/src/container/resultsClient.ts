import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    HomeState,
    getTasks,
    decrementCounter,
    addTask_click,
    add_task,
    submission,
    docDetailPage
  } from "../store/task";
import ResultComponent from '../components/Result'
  
const mapStateToProps = (state: HomeState) => ({
    tasks: state.tasks,
    c:state.c,
    add_task_screen:state.add_task_screen,
    docs:state.docs,
    doc_table:state.doc_table,
    show_doc_detail:state.show_doc_detail,
    docNum:state.docNum
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    //gettasks: () => dispatch(getTasks()),
    getTasks:()=>getTasks()(dispatch),
    decrementCounter: () => dispatch(decrementCounter()),
    addTask_click:()=>dispatch(addTask_click()),
    add_task:(t_obj:any)=>add_task(t_obj)(dispatch),
    submission:(taskNum:string,reqNum:string)=>submission(taskNum,reqNum)(dispatch),
    docDetailPage: (docNum:any)=> dispatch(docDetailPage(docNum))

  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResultComponent);