import React from "react";
import "./PulseTest.css"

const Pulse = (props) => {
    if(props.passed){
        return(
            <span className="test-passed">Tests Passed</span>
        );
    } else {
        return(
            <span className={(props.pulse? "text-shadow-pulse-off text-shadow-pulse":"text-shadow-pulse-off")}>Not All Tests Passed</span>
        );
    }

}
export default Pulse;