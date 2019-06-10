import React from "react";

const Console = (props) => {
    return (
        <>
            {
                props.output.map( (el,index) => {
                    return <pre key={index}>{el}</pre>
                })
            }
        </>
        )
        
}

export default Console;