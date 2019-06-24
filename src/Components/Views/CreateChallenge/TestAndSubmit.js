import React from 'react'
import Loader from 'react-loader-spinner';

export default function TestAndSubmitChalllenge(props) {
    return(
        <div>
            {props.passed ? 

            <div className="submit-button-container">
                <h1>Booom!!!</h1><br/>
                <h4>Your challenge has passed all the tests! You can go ahead and submit it!</h4><br/><br/>
                <button disabled={props.loading} className="submit-button" onClick={props.postForChallengeCreation}>
                    {props.loading ?             
                    
                    <Loader
                        type="TailSpin"
                        color="white"
                        height="40"	
                        width="40"
                    /> : 
                    
                    <p>Submit Challenge</p>}
                </button>
            </div> :

            <div className="test-button-container">
                <button className="run-tests" onClick={props.runTests}>Run Tests</button>
                <h2>Before the final submission<br/><br/> Let's see if your challenge passes all the tests</h2> 
            </div>
            }
        </div>
    )
}