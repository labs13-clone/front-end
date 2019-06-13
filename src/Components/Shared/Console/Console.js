import React from "react";

const Console = (props) => {
    return (
        <div style={{"background":"#263238",color:"white",width:550,height:350,"margin":"0 auto 100px"}}>
            {
                props.output.map( (el,index) => {
                    return <pre key={index}>{el}</pre>
                })
            }
        </div>
        )
        
}

export default Console;