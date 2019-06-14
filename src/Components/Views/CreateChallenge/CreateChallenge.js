import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import worker_script from "../../../Utility/worker";

import Editor from '../../Shared/Editor/Editor';
import "./CreateChallenge.css"


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
    const [passed, setPassed] = useState(false);

    function handEditorleInputChange(editor, data, code){
        setMarkdownInput(code);
        setPayload({...payload, description:code})
    }

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
                setPassed(e.data.toString() == "true");
              }
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

    function runTests(){ 
        const testArray = tests.map(obj => {
            if(obj.argumentsToPass === "") {
                obj.argumentsToPass = "[]"
            }
            obj.argumentsToPass = eval(obj.argumentsToPass);
            return obj;
        })
        window.worker.postMessage({msg:"run_tests",code:javascriptSolutionInput,tests:tests});
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
        if(passed === true) {
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
        } else {
            alert("the challenge didn't pass")
        }
    };

    return(
        <div>
            <div className="meta-container">
                <h3>Meta</h3>
                <form>
                    <h4>Title</h4>
                    <input value={title} onChange={e => handleTitleChanges(e)}/>
                    <h4>Difficulty</h4>
                    <select onChange={e => handleDifficultyChanges(e)}>
                        <option>Select</option>
                        <option value="16">Easy</option>
                        <option value="50">Medium</option>
                        <option value="75">Hard</option>
                    </select>
                    <h4>Categories</h4>
                    <input value={category} onChange={e => handleCategoryChanges(e)}/>
                </form>
            </div>
            <div className="instructions-container">
                <h3>instructions</h3>
                <p>we are going to pull a paragraph from backend and will render here.</p>
            </div>
            <div className="creation-editor-container">
                <Editor
                    code={markdownInput}
                    theme={'material'}
                    mode={'markdown'}
                    changeHandler={handEditorleInputChange}
                    auth={props.auth}
                />
                <ReactMarkdown source={markdownInput} className="markdown-render"/>
            </div>
            <div>
                <form>
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
            <div>
                <div>
                <h1>skeleton</h1>
                    <Editor
                        code={javascriptInput}
                        theme={'material'}
                        mode={'javascript'}
                        changeHandler={handleInputChange}
                        auth={props.auth}
                    />
                </div>
                <div>
                    <h1>solution</h1>
                    <h2>{passed.toString()}</h2>
                    <Editor
                        code={javascriptSolutionInput}
                        theme={'material'}
                        mode={'javascript'}
                        changeHandler={handleSolutionInputChange}
                        auth={props.auth}
                    />
                    <button onClick={runTests}>Run Tests</button>
                </div>
            </div>
        </div>
    )
}

export default CreateChallenge;
