import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';

import worker_script from "../../../Utility/worker";
import Editor from '../../Shared/Editor/Editor';
import "./CreateChallenge.css";
import Console from "../../Shared/Console/Console";
import Tabs from './Tabs';
import { useWorker } from '../../../Utility/WorkerHook';
import CategoryDropDown from './Categories';
import Instructions from './Instructions';
import SharedModal from "../../Shared/SharedModal/SharedModal";

function CreateChallenge(props) {
    const accessToken = props.auth.accessToken;
    const [payload, setPayload] = useState({})
    const [markdownInput, setMarkdownInput] = useState('')
    const [title, setTitle] = useState("")
    const [difficulty, setDifficulty] = useState(1)
    const [category, setCategory] = useState("")
    const [tests, setTests] = useState([{descriptor: "", argumentsToPass: "", expectedResult: ""}])
    const [buttonState, setButtonState] = useState(true)
    const [javascriptInput, setJavascriptInput] = useState('')
    const [javascriptSolutionInput, setjavascriptSolutionInput] = useState('')
    const [passed, setPassed] = useState(false);
    const [output, setOutput] = useState([]);
    const [userMessage, setUserMessage] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([])
    const [modalState, setModalState] = useState(false);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        axios({
            method: 'get', 
            url: `${process.env.REACT_APP_SERVER}/api/categories/`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
            })
            .then(res => {
                setCategory(res.data)
                const categoryOptions = res.data.map(obj => {
                    return {
                        label: obj.name,
                        value: obj.id
                    }
                })
                setCategory(categoryOptions)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

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

    function extractSkeletonFunction() {
        //this regex is extracting everything between "first space followed by an alphanumeric character" and "{↵"
        const regexp = /\s\w(.*?)\{↵/;
        payload.skeleton_function = "function" + regexp.exec('function sayHello() {↵ some randome code↵}')[0] + "↵}"
    }

    function postForChallengeCreation(event, token, payload) {
        event.preventDefault();
        setLoading(true)
        extractSkeletonFunction();

            axios({
                    method: 'post', 
                    url: `${process.env.REACT_APP_SERVER}/api/challenges`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: payload
            })
            .then(challengeRes => {
                console.log(challengeRes)
                const selectedOptions = selectedCategories.map(int => {
                    return {
                        challenge_id: challengeRes.data.id,
                        categories_id: int
                    }
                })
                axios({
                    method: 'post', 
                    url: `${process.env.REACT_APP_SERVER}/api/categories/challenges`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: selectedOptions
                    })
                    .then(categoryRes => {
                        if(categoryRes) {
                            setModalState(true)
                            setLoading(false)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                
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

    function modalCallback(){
        setModalState(!modalState);
    }

    return(

        <div className="create-challenge-container">
            <Tabs className="tabs">
                <div label="Instructions">
                    <div className="tab-container">
                        <Instructions/>
                    </div>
                </div>
                <div label="Meta">
                    <div className="tab-container">
                        <div className="meta-container">
                        <h3>Basic Information</h3>
                        <br/><br/>
                        <form className="meta-form">
                            <div>
                                <h4>Title</h4>
                                <br/>
                                <input className="challenge-info" value={title} onChange={e => handleTitleChanges(e)}/>
                            </div>
                            <div>
                                <h4>Difficulty</h4>
                                <br/>
                                <select style={{'width': '50px'}} className="challenge-info" style={{width:200}} onChange={e => handleDifficultyChanges(e)}>
                                    <option>Select</option>
                                    <option value="16">Easy</option>
                                    <option value="50">Medium</option>
                                    <option value="75">Hard</option>
                                </select>
                            </div>
                            <div>
                                <h4>Categories</h4>
                                <br/>
                                <CategoryDropDown 
                                    options={category} 
                                    selectedCategories={selectedCategories} 
                                    setSelectedCategories={selected => {setSelectedCategories(selected)}}
                                />
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
                                    <h2 className="test-header">Test {index + 1}</h2> <br/><br/>
                                    <div className="test-container">
                                        <div>
                                            <h4>Description</h4><br/>
                                            <input
                                                className="tests-input"
                                                value={tests[index].descriptor}
                                                name="descriptor"
                                                onChange={e => handleChanges(index, e)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <h4>Arguments</h4><br/>
                                            <input
                                                className="tests-input"
                                                value={tests[index].argumentsToPass}
                                                name="argumentsToPass"
                                                onChange={e => handleChanges(index, e)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <h4>Expected Result</h4><br/>
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
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div label="Submit">
                    <div className="tab-container tab-container-submit">
                        {passed 
                        ? 
                        <div className="submit-button-container">
                            <h1>Booom!!!</h1><br/>
                            <h4>Your challenge has passed all the tests! You can go ahead and submit it!</h4><br/><br/>
                            <button disabled={loading} className="submit-button" onClick={event => postForChallengeCreation(event, accessToken, payload)}>
                            { loading ?             
                                <Loader
                                    type="TailSpin"
                                    color="white"
                                    height="40"	
                                    width="40"
                                /> : 
                                <p>Submit Challenge</p>}
                            </button>
                        </div> 
                        :
                        <div className="test-button-container">
                            <button className="run-tests" onClick={runTests}>Run Tests</button>
                            <h2>Before the final submission<br/><br/> Let's see if your challenge passes all the tests</h2> 
                        </div>
                        }
                    </div>
                </div>
            </Tabs>
            <div>
                <Console runCode={runCode} clearConsole={clearConsole} output={output} style={{width: "63%"}}/>
            </div>
            <SharedModal class="create-challenge-modal" message={
            <div className="modal-text-container">
                <h1>Success!</h1>
                <p>Your challenge is submitted for approval</p>
                <p>See the status in your profile</p>
                <Link to="/profile"><button>Profile</button></Link>
            </div>
            } 
            modalCallback={modalCallback} modalState={modalState}/>
        </div>
    )
}

export default CreateChallenge;
