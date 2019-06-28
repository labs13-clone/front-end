import React, { useState, useEffect } from 'react';
import {getData,getSubmission,postSubmission,updateSubmission, resetSubmission} from "./NetworkRequests"
import Editor from "../../Shared/Editor/Editor";
import Console from "../../Shared/Console/Console";
import worker_script from "../../../Utility/worker";
import { useWorker } from "../../../Utility/WorkerHook";
import ReactMarkdown from 'react-markdown';
import FullScreen from "react-full-screen";
import './AttemptChallenge.css';
import {Fullscreen as FullscreenIcon, FullscreenExit as FullscreenExitIcon, Star} from "@material-ui/icons";
import MenuBar from "./FullscreenMenuBar";
import SharedModal from "../../Shared/SharedModal/SharedModal"

function AttemptChallenge(props) {

    const [challenge, setChallenge] = useState({id:null,difficulty:null,skeleton_function:"",tests:[],title:"",categories:[]});
    const [userSubmission, setUserSubmission] = useState({id:null,challenge_id:null,total_attempts:null,code_execs:null,total_code_execs:null,test_execs:null,total_test_execs:null,completed:false,solution:""});
    const [userMessage, setUserMessage] = useState({});
    const [output, setOutput] = useState([]);
    const [passed, setPassed] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [pulse,setPulse] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [testCounter, setTestCounter] = React.useState(0);
    const {result,error} = useWorker(worker_script,userMessage);
    const [appError,setAppError] = React.useState(null);
  
    useEffect(() => {
        const submissionReq = getSubmission(props.auth.accessToken,props.match.params.id);
        const challengeReq = getData(props.auth.accessToken,props.match.params.id);

        const attemptChallengeData = Promise.all([submissionReq,challengeReq]);

        attemptChallengeData
        .then(res => {
            const [{data:{0:submissionRes}}, {data:{0:challengeRes}}] = res; // destructuring to unpack response data to an object. Res is an array with two responses from axios. The final result is a an object for each request by destructuring res to two variables that are objects. The objects have properties named "data". Data is an array with a single element. The first index "0" is destructured to retreive an object. 
            
            if(challengeRes===undefined){
                props.history.replace("/404")
            } else {
                setChallenge(challengeRes);

            if (submissionRes===undefined){
                postSubmission(props.auth.accessToken,challengeRes.id)
                .then(res => {
                    const newSubmissionRes = res.data;
                    setUserSubmission(newSubmissionRes);
                })
                .catch((err) => {
                    setAppError(err);
                })
            } else {
                setUserSubmission(submissionRes);
                if(submissionRes.completed ){
                    setPassed(true);
                }
            }
            }
            
        })
        .catch((err) => {
            setAppError(err);
        })
    }, []);

    useEffect(() => {
    if(result.length===0){
        setOutput([]);
    } else {
        const resLen = result.length;
        switch (result[resLen-1].msg){
            case "run_code":
                setOutput(result);
                updateSubmission(props.auth.accessToken,userSubmission.solution,userSubmission.id,"/exec")
                .then(res => setUserSubmission({...res.data}))
                .catch((err) => {
                    setAppError(err);
                });
                break;
            case "run_tests":
                const testResult = (result[resLen-1].result.toString()==='true' ? true : false);
                setPassed(testResult);
                setPulse(true);
                setTimeout(()=>{
                    setPulse(false);
                },1000);
                setTestCounter(testCounter + 1)
                if(isSubmitting && testResult){
                    updateSubmission(props.auth.accessToken,userSubmission.solution,userSubmission.id,"/attempt")
                    .then(res => {
                        setIsSubmitting(false);
                        setUserSubmission({...res.data});
                    })
                    .catch((err) => {
                        setIsSubmitting(false);
                        setAppError(err);
                    });
                } else {
                    updateSubmission(props.auth.accessToken,userSubmission.solution,userSubmission.id,"/test")
                    .then(res => {
                        setIsSubmitting(false);
                        setUserSubmission({...res.data});
                    }).catch((err) => {
                        setIsSubmitting(false);
                        setAppError(err);
                    });
                }
                break;
            default:
                break;
        };
    } 
    },[result]);

    useEffect(() => {
        if(isFull){
            setIsFull(false);
        }
    },[appError])
    

    function handleInputChange(editor,data,userCode){
        if(!userSubmission.completed){
            setUserSubmission({...userSubmission,solution:userCode});
        }
    };

    function clearConsole(){
        setUserMessage("clear_console");
    };
    
    function runCode(){
        const solution = userSubmission.solution;
        setUserMessage({msg:"run_code",code:solution});
    };

    function runTests(){
        setPulse(true);
        const solution = userSubmission.solution;
        setUserMessage({msg:"run_tests",code:solution,tests:challenge.tests});
    };

    function fullscreenOnChange(e){
        setIsFull(e);
    };

    function goFull(){
        setIsFull(!isFull);
    };

    function submitChallenge(){
        setIsSubmitting(true);
        setUserMessage({msg:"run_tests",code:userSubmission.solution,tests:challenge.tests});
    };

    function resetChallenge(){
        resetSubmission(props.auth.accessToken,userSubmission.id)
        .then(() => {
            window.location.reload()
        }) 
        .catch((err) => {
            setAppError(err);
        }
        );
    };

    function modalCallback(){
        setAppError(null);
    };

    return (
        <div className="full-screenable-node">
            <FullScreen enabled={isFull} onChange={fullscreenOnChange}>
            <div className={isFull ? "fullscreen-challenge-header-wrapper ": "challenge-header-wrapper"}>
                <div className="challenge-sub-header-wrapper">
                    <h3 className="challenge-header">{challenge.title}</h3>
                    <div className="xp-wrapper">
                        <Star style={{ fontSize: 16 }}/>
                        <h4 className="xp-points">{challenge.difficulty}</h4>
                    </div>
                </div>

                {
                    (isFull ?
                                <FullscreenExitIcon aria-label="Exit Full Screen" style={{"cursor": 'pointer'}} fontSize="large" onClick={goFull}/>
                            :
                                <FullscreenIcon aria-label="Enter Full Screen" style={{"cursor": 'pointer'}} fontSize="large" onClick={goFull}/>
                    )
                }
                    
            </div>
            
            <div className="attempt-challenge-wrapper"> 
                <div className="top-panel">
                    <div className={(isFull ? "fullscreen-unnecessary-div":"unnecessary-div")}>
                        <MenuBar testCounter={testCounter} pulse={pulse} completed={userSubmission.completed} passed={passed} isFull={isFull} resetChallenge={resetChallenge} submitChallenge={submitChallenge} runTests={runTests}/>
                        {
                            (!userSubmission.completed ? 
                            <Editor class={(isFull ? "fullscreen-editor-style" : "editor-style" )} code={userSubmission.solution} changeHandler={handleInputChange} mode={"javascript"} readOnly={false}/> :
                            <Editor class={(isFull ? "fullscreen-editor-style" : "editor-style ")} code={userSubmission.solution} changeHandler={handleInputChange} mode={"javascript"} readOnly={true}/>
                            )
                        }
                        
                    </div>
                    <div className={(isFull ? "fullscreen-attempt-markdown-wrapper":"attempt-markdown-wrapper")}>
                        <h2 className="challenge-instructions">Instructions</h2>
                        <ReactMarkdown source={challenge.description} />
                    </div>
                </div>
                
                <Console disabled={userSubmission.completed} runCode={runCode} clearConsole={clearConsole} output={output} class={(isFull ? "fullscreen-console" :"attempt-challenge-console")}/>
                
            </div>
            </FullScreen>

            <SharedModal 
                class="create-challenge-modal" 
                message={<div className="modal-text-container">
                            <h1>App Error</h1>
                            <h3>Cannot connect to server</h3>
                        </div>} 
                modalCallback={modalCallback} 
                modalState={!!appError}
            />
         </div>

    );

};

export default AttemptChallenge;
