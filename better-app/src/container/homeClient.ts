import { Dispatch,bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    HomeState,
    setTasks,
    getTasks,
    decrementCounter,
    addTask_click
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
    addTask_click:()=>dispatch(addTask_click())
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeComponent);