import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Check, Clear} from "@material-ui/icons";
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
            return <span className="completed">Completed Challenge</span>
            } else if(props.passed){
                return(
                    // <React.Fragment >
                    //     <Check color="secondary" />
                        <span className="test-passed">Tests Passed</span>
                    // </React.Fragment>
                );
            } else {
                return (
                // <React.Fragment>
                //     <Clear color="secondary" />
                    <span className="uncompleted">Tests Failed</span>
                // </React.Fragment>
                )
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