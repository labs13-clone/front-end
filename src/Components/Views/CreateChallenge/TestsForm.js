import React from 'react'

export default function TestsForm(props) {
    return(
        <div className="create-challenge-tests">
            <form className="tests-form">
                {props.tests.map((test, index) => {
                    return (
                        <div key={index}>
                            <h2 className="test-header">Test {index + 1}</h2><br/><br/>
                            <div className="test-container">
                                <div className="heading-input-container">
                                    <h4>Description</h4><br/>
                                    <div style={{display: 'flex', alignItems: 'center', borderRadius: '5px', background: 'white', height: '25px'}}>
                                    <input
                                        style={{'margin': '0px'}}
                                        className="tests-input"
                                        value={props.tests[index].descriptor}
                                        name="descriptor"
                                        onChange={props.handleChanges}
                                        id={index}
                                        required
                                        />
                                        <div className="help-tip help-tip-dark">
                                            <p>This is the inline help tip! It can contain all kinds of HTML. Style it as you please.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4>Arguments</h4><br/>
                                    <div style={{display: 'flex', alignItems: 'center', borderRadius: '5px', background: 'white', height: '25px'}}>
                                        <input
                                            style={{'margin': '0px'}}
                                            className="tests-input"
                                            value={props.tests[index].argumentsToPass}
                                            name="argumentsToPass"
                                            onChange={props.handleChanges}
                                            required
                                            id={index}
                                        />
                                        <div className="help-tip help-tip-dark">
                                            <p>This is the inline help tip! It can contain all kinds of HTML. Style it as you please.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4>Expected Result</h4><br/>
                                    <div style={{display: 'flex', alignItems: 'center', borderRadius: '5px', background: 'white', height: '25px'}}>
                                        <input
                                            style={{'margin': '0px'}}
                                            className="tests-input"
                                            value={props.tests[index].expectedResult}
                                            name="expectedResult"
                                            onChange={props.handleChanges}
                                            id={index}
                                            required
                                            />
                                        <div className="help-tip help-tip-dark">
                                            <p>This is the inline help tip! It can contain all kinds of HTML. Style it as you please.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button disabled={props.tests.length <= 1 ? true : false} className="delete-test-button" id={index} onClick={props.removeTest}>
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>)
                    })}
                <button className="add-test-button" disabled={!props.buttonState} onClick={props.addTest}>
                    New Test
                </button>
            </form>
        </div>
    )
}