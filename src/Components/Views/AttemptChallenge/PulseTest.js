import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./PulseTest.css"

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));

const Pulse = (props) => {
    const classes = useStyles();
    if(props.counter<1 && !props.completed){
        return <span/>
    } else{

        if(props.completed){
            return <span className="test-passed">Completed</span>
            } else if(props.passed){
                return <span className={props.pulse? "test-passed icon-shake" : "test-passed"}>Tests Passed</span>;
            } else {
                return <span className={props.pulse? "test-failed icon-shake" : "test-failed"}>Tests Failed</span>
            } 
    }
}
export default Pulse;

// else{
//     return(
//         <span className={(props.pulse? "text-shadow-pulse-off text-shadow-pulse":"text-shadow-pulse-off")}>Not All Tests Passed</span>
//     );
// }

{/* <span className="test-passed">Tests Passed</span> */}