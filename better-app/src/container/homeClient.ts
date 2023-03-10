import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    HomeState,
    getTasks,
    decrementCounter,
    addTask_click,
    add_task,
    addRequest_click,
    task_selected,
    add_request
  } from "../store/task";
import HomeComponent from '../components/Home'
  
const mapStateToProps = (state: HomeState) => ({
    tasks: state.tasks,
    loaderHome:state.loaderHome,
    add_task_screen:state.add_task_screen,
    add_request_screen:state.add_request_screen,
    task_select:state.task_select
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    //gettasks: () => dispatch(getTasks()),
    getTasks:()=>getTasks()(dispatch),
    decrementCounter: () => dispatch(decrementCounter()),
    addTask_click:(val:boolean)=>dispatch(addTask_click(val)),
    addRequest_click:(val:boolean)=>dispatch(addRequest_click(val)),
    add_task:(t_obj:any)=>add_task(t_obj)(dispatch),
    task_selected:(val:number)=>dispatch(task_selected(val)),
    add_request:(r_obj:any,taskNum:string)=>add_request(r_obj,taskNum)(dispatch)

  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeComponent);