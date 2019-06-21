import React from "react";

require('./Console.css');

const Console = (props) => {
    return (
        <div className="console">
            <div className="console-buttons-wrapper">
                <button className="console-button" onClick={props.runCode}>Run Code</button>
                <button className="console-button" onClick={props.clearConsole}>Clear Console</button>
            </div>
                {
                props.output.map( (el,index) => {
                    if(el.msg==="run_code"){
                        return <pre key={index}>{el.result.toString()}</pre>;
                    }
                    })
                }
            
        </div>
        )
}

export default Console;