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
                                <div>
                                    <h4>Description</h4><br/>
                                    <input
                                        className="tests-input"
                                        value={props.tests[index].descriptor}
                                        name="descriptor"
                                        onChange={props.handleChanges}
                                        id={index}
                                        required
                                        />
                                </div>
                                <div>
                                    <h4>Arguments</h4><br/>
                                    <input
                                        className="tests-input"
                                        value={props.tests[index].argumentsToPass}
                                        name="argumentsToPass"
                                        onChange={props.handleChanges}
                                        required
                                        id={index}
                                    />
                                </div>
                                <div>
                                    <h4>Expected Result</h4><br/>
                                    <input
                                        className="tests-input"
                                        value={props.tests[index].expectedResult}
                                        name="expectedResult"
                                        onChange={props.handleChanges}
                                        id={index}
                                        required
                                        />
                                </div>
                                <div>
                                    <button className="delete-test-button" id={index} onClick={props.removeTest}>
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>)
                    })}
                <button className="add-test-button" disabled={!props.buttonState} onClick={props.addTest}>
                    Add Test
                </button>
            </form>
        </div>
    )
}