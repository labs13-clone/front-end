import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import worker_script from "../../../Utility/worker";

import Editor from '../../Shared/Editor/Editor';
import "./CreateChallenge.css"
import Console from "../../Shared/Console/Console";


function CreateChallenge(props) {
    const accessToken = props.auth.accessToken;
    let [payload, setPayload] = useState({})
    let [markdownInput, setMarkdownInput] = useState('')
    let [title, setTitle] = useState("")
    let [difficulty, setDifficulty] = useState(1)
    let [category, setCategory] = useState("")
    let [tests, setTests] = useState([{descriptor: "", argumentsToPass: "", expectedResult: ""}])
    let [buttonState, setButtonState] = useState(true)
    let [javascriptInput, setJavascriptInput] = useState('')
    let [javascriptSolutionInput, setjavascriptSolutionInput] = useState('')
    let [passed, setPassed] = useState(false);
    let [output, setOutput] = useState([]);

    useEffect(() => {
        const myArray = tests.map(e => {
            if(e.descriptor !== "" && e.expectedResult !== ""){
                return true
            } else {
                return false
            }	
        })
        
        const bool = myArray.every(e => {
            if(e===true){ 
                return true
            } else {
                return false
            }
        });
        setButtonState(bool);
    }, [tests]);

    useEffect(() => {
        if (window.Worker) {
            window.worker = new Worker(worker_script);
            window.worker.onmessage = (e) => {
                switch (e.data.msg){
                    case "run_code":
                        setPassed(e.data.result.toString() === "true" ? true : false);
                        setOutput([e.data.result.toString()]);
                        break;
                    case "run_tests":
                        const testResult = (e.data.result.toString()==='true' ? true : false)
                        setPassed(testResult);
                        if(testResult){
                            setOutput(["Passed Tests!!!",e.data.result.toString()]);
                        }else{
                            setOutput(["Not all tests passed",e.data.result.toString()]);
                        }
                        break;
                    default:
                        break;
                };
            };
            window.worker.onerror = (e) => {
                window.worker.terminate();
                }
        } else {
            console.log('Your browser doesn\'t support web workers.');
            // todo : send alert to user and redirect home
        }
        return () => {
            window.worker.terminate();
            window.worker = undefined;
        }
    }, [])

    function clearConsole(){
        setOutput([]);
    };

    function runCode(){
        window.worker.postMessage({msg:"run_code", code:javascriptSolutionInput});
    };

    function handEditorleInputChange(editor, data, code){
        setMarkdownInput(code);
        setPayload({...payload, description:code})
    }

    function runTests(){ 
        const testArray = tests.map(obj => {
            if(obj.argumentsToPass === "") {
                obj.argumentsToPass = "[]"
            }
            obj.argumentsToPass = eval(obj.argumentsToPass);
            return obj;
        })
        window.worker.postMessage({msg:"run_tests", code:javascriptSolutionInput, tests:tests});
    };

    function addTest(e) {
        e.preventDefault();
        const values = [...tests]
        values.push({descriptor: "", argumentsToPass: "", expectedResult: ""});
        setTests(values)
    }

    function removeTest(e) {
        e.preventDefault();
        const values = [...tests]
        values.splice(e.target.id, 1);
        setTests(values)
    }

    function handleChanges(i, e) {
        const values = [...tests]
        values[i][e.target.name] = e.target.value;
        setTests(values)
        setPayload({...payload, tests:values})
    }

    function handleInputChange(editor, data, code){
        setJavascriptInput(code);
        setPayload({...payload, skeleton_function:code})
    }

    function handleSolutionInputChange(editor, data, code){
        setjavascriptSolutionInput(code);
        setPayload({...payload, solution:code})
    }

    function handleTitleChanges(e) {
        e.preventDefault()
        let values = [...title]
        values = e.target.value;
        setTitle(values)
        setPayload({...payload, title:values})
    }

    function handleDifficultyChanges(e) {
        e.preventDefault()
        setDifficulty(parseInt(e.target.value, 10))
        setPayload({...payload, difficulty:parseInt(e.target.value, 10)})
    }

    function handleCategoryChanges(e) {
        e.preventDefault()
        let values = [...category]
        values = e.target.value;
        setCategory(values)
    }

    function postForChallengeCreation(event, token, payload) {
        event.preventDefault();
        // if(passed === true) {
            axios({
                    method: 'post', 
                    url: `${process.env.REACT_APP_SERVER}/api/challenges`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: payload
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err, err.message, process.env.REACT_APP_SERVER)
            })
        // } else {
        //     alert("the challenge didn't pass")
        // }
    };

    return(
        <div>
            <div className="meta-container">
                <h3>Basic Information</h3>
                <form className="meta-form">
                    <div>
                        <h4>Title</h4>
                        <input value={title} onChange={e => handleTitleChanges(e)}/>
                    </div>
                    <div>
                        <h4>Difficulty</h4>
                        <select style={{width:200}} onChange={e => handleDifficultyChanges(e)}>
                            <option>Select</option>
                            <option value="16">Easy</option>
                            <option value="50">Medium</option>
                            <option value="75">Hard</option>
                        </select>
                    </div>
                    <div>
                        <h4>Categories</h4>
                        <input value={category} onChange={e => handleCategoryChanges(e)}/>
                    </div>
                </form>
            </div>
            <div className="description-editor-container">
                <div className="editor" style={{"margin-left": "250px"}}>
                    <section className="playground">
                        <div className="code-editor js-code">
                            <div className="editor-header">Description</div>
                            <Editor
                                code={markdownInput}
                                theme={'material'}
                                mode={'markdown'}
                                changeHandler={handEditorleInputChange}
                                auth={props.auth}
                            />
                        </div>
                    </section>
                </div>
                <ReactMarkdown source={markdownInput} className="markdown-render" placeholder="Preview"/>
            </div>
            <div className="challenge-code-container">
                <div className="editor" style={{"margin-left": "250px"}}>
                    <section className="playground">
                        <div className="code-editor js-code">
                            <div className="editor-header">Skeleton Function</div>
                            <Editor
                                code={javascriptInput}
                                theme={'material'}
                                mode={'javascript'}
                                changeHandler={handleInputChange}
                                auth={props.auth}
                            />
                        </div>
                    </section>
                </div>
                <div className="editor" style={{"margin-right": "250px"}}>
                    <section className="playground">
                        <div className="code-editor js-code">
                            <div className="editor-header">Solution</div>
                            <Editor
                                code={javascriptSolutionInput}
                                theme={'material'}
                                mode={'javascript'}
                                changeHandler={handleSolutionInputChange}
                                auth={props.auth}
                            />
                        </div>
                    </section>
                </div>
            </div>
            <button style={{"margin-left": "250px"}} onClick={runTests}>Run Tests</button>
            <button onClick={runCode}>Run Code</button>
            <button onClick={clearConsole}>Clear Console</button>

            <Console output={output} style={{width: "63%"}}/>

            <div className="create-challenge-tests">
                <form className="tests-form">
                    {tests.map((test, index) => {
                        return (<div>
                            <h2>Test {index + 1}</h2>
                            <input
                                value={tests[index].descriptor}
                                name="descriptor"
                                placeholder="descriptor"
                                onChange={e => handleChanges(index, e)}
                                required
                            />
                            <input
                                value={tests[index].argumentsToPass}
                                name="argumentsToPass"
                                placeholder="Arguments to pass"
                                onChange={e => handleChanges(index, e)}
                                required
                            />
                            <input
                                value={tests[index].expectedResult}
                                name="expectedResult"
                                placeholder="expected return value"
                                onChange={e => handleChanges(index, e)}
                                required
                            />
                            <button id={index} onClick={e => removeTest(e)}>Remove Test</button>
                        </div>)
                    })}
                <button disabled={!buttonState} onClick={(e) => addTest(e)}>Add Test</button>
                <button disabled={!buttonState} onClick={event => postForChallengeCreation(event, accessToken, payload)}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateChallenge;
