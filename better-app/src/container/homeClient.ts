import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    HomeState,
    getTasks,
    decrementCounter,
    addTask_click,
    add_task,
    //selectTask
  } from "../store/task";
import HomeComponent from '../components/Home'
  
const mapStateToProps = (state: HomeState) => ({
    tasks: state.tasks,
    c:state.c,
    add_task_screen:state.add_task_screen
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    //gettasks: () => dispatch(getTasks()),
    getTasks:()=>getTasks()(dispatch),
    decrementCounter: () => dispatch(decrementCounter()),
    addTask_click:()=>dispatch(addTask_click()),
    add_task:(t_obj:any)=>add_task(t_obj)(dispatch),
    //selectTask: (val:string) => dispatch(selectTask(val))

  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeComponent);