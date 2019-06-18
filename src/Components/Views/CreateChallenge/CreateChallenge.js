import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import worker_script from "../../../Utility/worker";

import Editor from '../../Shared/Editor/Editor';
import "./CreateChallenge.css"
import Console from "../../Shared/Console/Console";
import Tabs from './Tabs';
import { useWorker } from '../../../Utility/WorkerHook'

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
    const [userMessage, setUserMessage] = useState({});

    const {result,error} = useWorker(worker_script,userMessage);

    useEffect(() => {
        if(result.length===0){
            setOutput([]);
        } else {
            const resLen = result.length;
            switch (result[resLen-1].msg){
                case "run_code":
                    setOutput(result);
                    break;
                case "run_tests":
                    const testResult = (result[resLen-1].result.toString()==='true' ? true : false);
                    setPassed(testResult);
                    console.log(testResult)
                    break;
                default:
                    break;
            };
        } 
        },[result]);

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

    function handEditorleInputChange(editor, data, code){
        setMarkdownInput(code);
        setPayload({...payload, description:code})
    }

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
        // setPayload({...payload, skeleton_function: )
        // console.log(`${code}`.match(/([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g))
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
        payload.skeleton_function = `${payload.solution}`.match(/([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g)[0]
        console.log(payload)
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
                console.log(err, payload)
            })
    };

    function clearConsole(){
        setUserMessage("clear_console")
    };
    
    function runCode(){
        setUserMessage({msg:"run_code",code:javascriptSolutionInput});
    };

    function runTests(){
        const testArray = tests.map(obj => {
            if(obj.argumentsToPass === "") {
                obj.argumentsToPass = "[]"
            }
            obj.argumentsToPass = eval(obj.argumentsToPass);
            return obj;
        })
        setUserMessage({msg:"run_tests",code:javascriptSolutionInput,tests:testArray});
    };

    return(
        <div className="create-challenge-container">
            <Tabs className="tabs">
                <div label="Meta">
                    <div className="tab-container">
                        <div className="meta-container">
                        <h3>Basic Information</h3>
                        <form className="meta-form">
                            <div>
                                <h4>Title</h4>
                                <input className="challenge-info" value={title} onChange={e => handleTitleChanges(e)}/>
                            </div>
                            <div>
                                <h4>Difficulty</h4>
                                <select className="challenge-info" style={{width:200}} onChange={e => handleDifficultyChanges(e)}>
                                    <option>Select</option>
                                    <option value="16">Easy</option>
                                    <option value="50">Medium</option>
                                    <option value="75">Hard</option>
                                </select>
                            </div>
                            <div>
                                <h4>Categories</h4>
                                <input className="challenge-info" value={category} onChange={e => handleCategoryChanges(e)}/>
                            </div>
                        </form>
                    </div>
            </div>

                </div>
                <div label="Description">
                    <div className="tab-container">
                        <div className="description-editor-container">
                            <div className="editor">
                                <section className="playground">
                                    <div className="code-editor js-code">
                                        <h2 className="editor-header">Description</h2>
                                        <Editor
                                            code={markdownInput}
                                            mode={'markdown'}
                                            changeHandler={handEditorleInputChange}
                                        />
                                    </div>
                                </section>
                            </div>

                        </div>
                        </div>
                    </div>
                <div label="Preview">
                    <div className="tab-container">
                        <ReactMarkdown source={markdownInput} className="markdown-render" placeholder="Preview"/>
                    </div>
                </div>
                <div label="Tests">
                    <div className="tab-container">
                        <div className="create-challenge-tests">
                        <form className="tests-form">
                            {tests.map((test, index) => {
                                return (<div>
                                    <h2 className="test-header">Test {index + 1}</h2>
                                    <div className="test-container">
                                        <div>
                                            <h4>Description</h4>
                                            <input
                                                className="tests-input"
                                                value={tests[index].descriptor}
                                                name="descriptor"
                                                onChange={e => handleChanges(index, e)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <h4>Arguments</h4>
                                            <input
                                                className="tests-input"
                                                value={tests[index].argumentsToPass}
                                                name="argumentsToPass"
                                                onChange={e => handleChanges(index, e)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <h4>Expected Result</h4>
                                            <input
                                                className="tests-input"
                                                value={tests[index].expectedResult}
                                                name="expectedResult"
                                                onChange={e => handleChanges(index, e)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <button className="delete-test-button" id={index} onClick={e => removeTest(e)}>X</button>
                                        </div>
                                    </div>
                                </div>)
                            })}
                        <button className="add-test-button" disabled={!buttonState} onClick={(e) => addTest(e)}>Add Test</button>
                        </form>
                    </div>
                    </div>
                </div>
                <div label="Code">
                    <div className="tab-container">
                        <div className="editor">
                            <section className="playground">
                                <div className="code-editor js-code">
                                    <h2 className="editor-header">Solution</h2>
                                    <Editor
                                        code={javascriptSolutionInput}
                                        mode={'javascript'}
                                        changeHandler={handleSolutionInputChange}
                                        // auth={props.auth}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </Tabs>
            <div>
                <Console runTests={runTests} runCode={runCode} clearConsole={clearConsole} output={output} style={{width: "63%"}}/>
                <div className="submit-button-wrapper">
                    <button className="submit-button" disabled={!passed} onClick={event => postForChallengeCreation(event, accessToken, payload)}>Submit Challenge</button>
                </div>
            </div>
        </div>
    )
}

export default CreateChallenge;
