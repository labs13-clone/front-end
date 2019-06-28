import React from 'react'

export default function TestsForm(props) {
    return (
        <div className="create-challenge-tests">
            <form className="tests-form">
                {props
                    .tests
                    .map((test, index) => {
                        return (
                            <div className="test-container" key={index}>
                                <h2 className="test-main-heading">Test {index + 1}</h2>
                                <div className="test-columns">
                                    <div className="test-input-container">
                                        <div className="heading-input-container">
                                            <h4 className="tests-input-heading">Description</h4>
                                            <div className="text-input-container">
                                                <input
                                                    className="tests-input"
                                                    value={props.tests[index].descriptor}
                                                    name="descriptor"
                                                    onChange={props.handleChanges}
                                                    id={index}
                                                    required/>
                                                <div className="help-tip help-tip-dark">
                                                    <p>Describe the test in a sentence. For example: "It should return a string"</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="heading-input-container">
                                            <h4 className="tests-input-heading">Arguments</h4>
                                            <div className="text-input-container">
                                                <input
                                                    className="tests-input"
                                                    value={props.tests[index].argumentsToPass}
                                                    name="argumentsToPass"
                                                    onChange={props.handleChanges}
                                                    required
                                                    id={index}/>
                                                <div className="help-tip help-tip-dark">
                                                    <p>pass the arguments in the form of an array. For example: [1, 2, 3]</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="heading-input-container">
                                            <h4 className="tests-input-heading">Expected Result</h4>
                                            <div className="text-input-container">
                                                <input
                                                    className="tests-input"
                                                    value={props.tests[index].expectedResult}
                                                    name="expectedResult"
                                                    onChange={props.handleChanges}
                                                    id={index}
                                                    required/>
                                                <div className="help-tip help-tip-dark">
                                                    <p>Expected output from the function. For example: "Hello World"</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        disabled={props.tests.length <= 1
                                        ? true
                                        : false}
                                        className="delete-test-button"
                                        id={index}
                                        onClick={props.removeTest}>
                                        X
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                <div className="add-test-button-container">
                    <button
                        className="add-test-button"
                        disabled={!props.buttonState}
                        onClick={props.addTest}>
                        New Test
                    </button>
                </div>
            </form>
        </div>
    )
}