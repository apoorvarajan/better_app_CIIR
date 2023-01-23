import { Dispatch,bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    HomeState,
    setTasks,
    getTasks,
    decrementCounter
  } from "../store/task";
import HomeComponent from '../components/Home'
  
const mapStateToProps = (state: HomeState) => ({
    tasks: state.tasks,
    c:state.c
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    //gettasks: () => dispatch(getTasks()),
    getTasks:()=>getTasks()(dispatch),
    decrementCounter: () => dispatch(decrementCounter())
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeComponent);