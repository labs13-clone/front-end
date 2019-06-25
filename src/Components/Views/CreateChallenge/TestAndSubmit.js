import React from 'react'
import Loader from 'react-loader-spinner';

export default function TestAndSubmitChalllenge(props) {
    if (!props.passed) {
            return <div className="test-button-container">
                <button disabled={!props.buttonState} className="run-tests" onClick={props.runTests}>{props.buttonState ? 'Run Tests' : 'Disabled'}</button>
                {
                    !props.buttonState ? <h2>Please provide at least one test before we move forward.</h2> : 
                    props.testRan ? <h2>Looks like your code is not passing the tests!</h2> :
                    <h2>Before the final submission<br/><br/> Let's see if your challenge passes all the tests</h2> 
                }
            </div>
        } else if (!props.areInputFieldsFilled) {
            return <div className="test-button-container">
                <button className="run-tests" onClick={props.runTests}>Run Tests</button>
                <h2>Your challenge has passed all the tests.</h2> <br/> 
                <h4>However, you need to provide all the information before submitting the challenge for approval.</h4>
            </div>
        } else {
                return <div className="submit-button-container">
                <h1>Booom!!!</h1><br/>
                <h4>Your challenge is ready for submission! Go ahead and submit it!</h4><br/><br/>
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
            </div>

        }
}

