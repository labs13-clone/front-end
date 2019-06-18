import React from "react";

const Console = (props) => {
    return (
        <div style={{"background":"#263238","color":"white","width":"900px","height":"350px","margin":"0 auto 100px"}}>
            
                {
                props.output.map( (el,index) => {
                    if(el.msg==="run_code"){
                        return <pre key={index}>{el.result}</pre>;
                    }
                    })
                }
            
        </div>
        )
}

export default Console;