import React, { useState, useEffect } from 'react';
import {getData,getSubmission,postSubmission,updateSubmission, resetSubmission} from "./NetworkRequests"
import Editor from "../../Shared/Editor/Editor";
import Console from "../../Shared/Console/Console";
import worker_script from "../../../Utility/worker";
import { useWorker } from "../../../Utility/WorkerHook";
import ReactMarkdown from 'react-markdown';
import FullScreen from "react-full-screen";
import './AttemptChallenge.css';
import Pulse from "./PulseTest";
import {Button,Menu,MenuItem} from "@material-ui/core";
import {Fullscreen as FullscreenIcon, FullscreenExit as FullscreenExitIcon, Star} from "@material-ui/icons";

function AttemptChallenge(props) {

    const [challenge, setChallenge] = useState({id:null,difficulty:null,skeleton_function:"",tests:[],title:"",categories:[]});
    const [userSubmission, setUserSubmission] = useState({id:null,challenge_id:null,total_attempts:null,code_execs:null,total_code_execs:null,test_execs:null,total_test_execs:null,completed:false,solution:""});
    const [userMessage, setUserMessage] = useState({});
    const [output, setOutput] = useState([]);
    const [passed, setPassed] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [pulse,setPulse] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [dropDownState, setDropDownState] = React.useState(null);
    const [testCounter, setTestCounter] = React.useState(0);

    const {result,error} = useWorker(worker_script,userMessage);
  
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
                .catch();
            } else {
                setUserSubmission(submissionRes);
                if(submissionRes.completed ){
                    setPassed(true);
                }
            }
            }
            
        })
        .catch(err => console.log(err, "error"));
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
                .catch();
                break;
            case "run_tests":
                const testResult = (result[resLen-1].result.toString()==='true' ? true : false);
                setPassed(testResult);
                setTestCounter(testCounter + 1)
                if(isSubmitting && testResult){
                    updateSubmission(props.auth.accessToken,userSubmission.solution,userSubmission.id,"/attempt")
                    .then(res => {
                        setUserSubmission({...res.data});
                        setIsSubmitting(false);
                    })
                    .catch();
                } else {
                    updateSubmission(props.auth.accessToken,userSubmission.solution,userSubmission.id,"/test")
                    .then(res => {
                        setUserSubmission({...res.data});
                        setIsSubmitting(false);
                    })
                    .catch();
                }
                break;
            default:
                break;
        };
    } 
    },[result]);
    

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
        setDropDownState(null);
        const solution = userSubmission.solution;
        setUserMessage({msg:"run_tests",code:solution,tests:challenge.tests});
    };

    function fullscreenOnChange(e){
        setIsFull(e)
    }

    function goFull(){
        setIsFull(!isFull)
    }

    function submitChallenge(){
        setDropDownState(null);
        setIsSubmitting(true);
        setUserMessage({msg:"run_tests",code:userSubmission.solution,tests:challenge.tests});
    }

    function resetChallenge(){
        setDropDownState(null);
        resetSubmission(props.auth.accessToken,userSubmission.id)
        .then(() => window.location.reload()) 
        .catch();
    }

   function handleClick(event) {
    setDropDownState(event.currentTarget);
  }

  function handleClose() {
    setDropDownState(null);
  }

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
                    (isFull ? (
                            <div>
                                <FullscreenExitIcon aria-label="Exit Full Screen" style={{"cursor": 'pointer'}} fontSize="large" onClick={goFull}/>
                                <h5>Fullscreen</h5>
                            </div>
                        ):
                                (
                                    <div>
                                        <FullscreenIcon aria-label="Enter Full Screen" style={{"cursor": 'pointer'}} fontSize="large" onClick={goFull}/>
                                        <h5>Exit Fullscreen</h5>
                                    </div>
                                    )
                    )
                }
                    
            </div>
            
            <div className="attempt-challenge-wrapper"> 
                <div className="top-panel">
                    <div className={(isFull ? "fullscreen-unnecessary-div":"unnecessary-div")}>

                        <div className={(isFull ? "fullscreen-action-bar" : "action-bar" )}>
                        <Pulse pulse={pulse} counter={testCounter} completed={userSubmission.completed} passed={passed}/>

                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{color:"whitesmoke"}}>
                            Open Menu
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={dropDownState}
                            keepMounted
                            open={Boolean(dropDownState)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={resetChallenge}>Reset Challenge</MenuItem>
                            <MenuItem disabled={userSubmission.completed} onClick={runTests}>Run Tests</MenuItem>
                            <MenuItem disabled={!passed || userSubmission.completed} onClick={submitChallenge}>{"Submit Solution"}</MenuItem>
                        </Menu>

                        </div>
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
            
         </div>
    );
}

export default AttemptChallenge;
