import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import {Link} from 'react-router-dom';

import worker_script from "../../../Utility/worker";
import Editor from '../../Shared/Editor/Editor';
import './CreateChallenge.css';
import Console from '../../Shared/Console/Console';
import Tabs from './Tabs';
import {useWorker} from '../../../Utility/WorkerHook';
import Instructions from './Instructions';
import SharedModal from "../../Shared/SharedModal/SharedModal";
import MetaForm from './Meta'
import TestsForm from './TestsForm'
import TestAndSubmitChalllenge from './TestAndSubmit';

function CreateChallenge(props) {  
    const accessToken = props.auth.accessToken;
  
    const [challenge, setChallenge] = useState({
        title: '',
        difficulty: 1,
        tests: [{descriptor: "", argumentsToPass: "", expectedResult: ""}],
        description: '',
        solution: '',
        skeleton_function: ''
    })
    const [category, setCategory] = useState("")
    const [buttonState, setButtonState] = useState(true)
    const [passed, setPassed] = useState(false);
    const [output, setOutput] = useState([]);
    const [userMessage, setUserMessage] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([])
    const [modalState, setModalState] = useState(false);
    const [loading, setLoading] = useState(false);

    const {result, error} = useWorker(worker_script, userMessage);

    //getting categories so that user can select out of these 
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
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //code related to running the code in webworker
    useEffect(() => {
        if (result.length === 0) {
            setOutput([]);
        } else {
            const resLen = result.length;
            switch (result[resLen - 1].msg) {
                case 'run_code':
                    setOutput(result);
                    break;
                case 'run_tests':
                    const testResult = (result[resLen - 1].result.toString()) === 'true'
                        ? true
                        : false;
                    setPassed(testResult);
                    break;
                default:
                    break;
            };
        }
    }, [result]);

    function clearConsole() {
        setUserMessage('clear_console');
    };

    function runCode() {
        setUserMessage({msg: 'run_code', code: challenge.solution});
    };

    function runTests() {
        const testArray = challenge.tests.map(obj => {
            if (obj.argumentsToPass === '') {
                obj.argumentsToPass = '[]';
            }
            obj.argumentsToPass = eval(obj.argumentsToPass);
            return obj;
        })
        setUserMessage({msg: 'run_tests', code: challenge.solution, tests: testArray});
    };

    //checking if user has filled all the mandatory fields in tests tab
    useEffect(() => {
        const myArray = challenge.tests.map(e => {
            if (e.descriptor !== '' && e.expectedResult !== '') {
                return true;
            } else {
                return false;
            }
        })

        const bool = myArray.every(e => {
            if (e === true) {
                return true;
            } else {
                return false;
            }
        });
        setButtonState(bool);
    }, [challenge.tests]);

    //change handler functions
    function handleTitleAndDifficultyChanges(e) {
        e.preventDefault();
        let values = {
            title: challenge.title,
            difficulty: challenge.difficulty,
        };
        values[e.target.name] = e.target.value;
        setChallenge({
            ...challenge, 
            title: values.title,
            difficulty: parseInt(values.difficulty, 10),
        })
    }

    function handleDescriptionEditorleChange(editor, data, code) {
        setChallenge({
            ...challenge,
            description: code,
        });
    }
    
    function handleTestsChanges(e) {
        const values = [ ...challenge.tests ];
        values[e.target.id][e.target.name] = e.target.value;
        setChallenge({
            ...challenge,
            tests: values,
        });
    }

    function handleSolutionEditorChange(editor, data, code) {
        const regexp = /\s\w(.*?)\{↵/;
        const skeleton_function = 'function' + regexp.exec('function sayHello() {↵ some random code↵}')[0] + '↵}';    
        setChallenge({
            ...challenge,
            solution: code,
            skeleton_function: skeleton_function,
        });
    }

    function addTest(e) {
        e.preventDefault();
        const values = { ...challenge.tests };
        values.push({descriptor: '', argumentsToPass: '', expectedResult: ''});
        setChallenge({
            ...challenge,
            tests: values
        });
    }

    function removeTest(e) {
        e.preventDefault();
        const values = { ...challenge.tests };
        values.splice(e.target.id, 1);
        setChallenge({
            ...challenge,
            tests: values,
        });
    }

    function postForChallengeCreation(event, token) {
        event.preventDefault();
        setLoading(true)
        createChallengeRequest(challenge, selectedCategories, accessToken, setModalState, setLoading)
    }

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
                        <MetaForm
                            title={challenge.title}
                            handleTitleAndDifficultyChanges={e => handleTitleAndDifficultyChanges(e)}
                            category={category} 
                            selectedCategories={selectedCategories} 
                            setSelectedCategories={selected => {setSelectedCategories(selected)}}        
                        />
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
                                            code={challenge.description}
                                            mode={'markdown'}
                                            changeHandler={handleDescriptionEditorleChange}/>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <div label="Preview">
                    <div className="tab-container">
                        <ReactMarkdown
                            source={challenge.description}
                            className="markdown-render"
                        />
                    </div>
                </div>
                <div label="Tests">
                    <div className="tab-container">
                        <TestsForm
                            tests={challenge.tests}
                            handleChanges={e => handleTestsChanges(e)}
                            removeTest={e => removeTest(e)}
                            buttonState={buttonState}
                            addTest={e => addTest(e)}
                        />
                    </div>
                </div>
                <div label="Solution">
                    <div className="tab-container">
                        <div className="editor">
                            <section className="playground">
                                <div className="code-editor js-code">
                                    <h2 className="editor-header">Solution</h2>
                                    <Editor
                                        code={challenge.solution}
                                        mode={'javascript'}
                                        changeHandler={handleSolutionEditorChange}/>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div label="Submit">
                    <div className="tab-container tab-container-submit">
                        <TestAndSubmitChalllenge
                            passed={passed}
                            loading={loading}
                            postForChallengeCreation={e => {postForChallengeCreation(e, accessToken)}}
                            runTests={runTests}
                        />
                    </div>
                </div>
            </Tabs>
            <Console runCode={runCode} clearConsole={clearConsole} output={output} style={{width: "63%"}}/>
            <SharedModal 
                class="create-challenge-modal" 
                message={<div className="modal-text-container">
                            <h1>Success!</h1>
                            <p>Your challenge is submitted for approval</p>
                            <p>See the status in your profile</p>
                            <Link to="/profile">
                                <button>Profile</button>
                            </Link>
                        </div>} 
                modalCallback={modalCallback} 
                modalState={modalState}
            />
        </div>
    )
}

function createChallengeRequest(challenge, selectedCategories, token, setModalState, setLoading) {

    axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}/api/challenges`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: challenge
    })
    .then(challengeRes => {
        addCategoriesRequest(challengeRes.data, selectedCategories, token, setModalState, setLoading)
    })
    .catch(err => {
        console.log(err.message)
    })
}

function addCategoriesRequest(challenge, selectedCategories, token, setModalState, setLoading) {
    const arrayOfselectedCategories = selectedCategories.map(id => {
        return {
            challenge_id: challenge.id,
            categories_id: id
        }
    })
    axios({
        method: 'post', 
        url: `${process.env.REACT_APP_SERVER}/api/categories/challenges`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: arrayOfselectedCategories
    })
    .then(categoryRes => {
        if(categoryRes) {
            setModalState(true)
            setLoading(false)
        }
        console.log(categoryRes)
    })
    .catch(err => {
        console.log(err.message)
    })

}

export default CreateChallenge;
