import React, { useState, useEffect } from 'react';
import {getData,getSubmission,postSubmission,updateSubmission} from "./NetworkRequests"
import Editor from "../../Shared/Editor/Editor";
import Console from "../../Shared/Console/Console";
import worker_script from "../../../Utility/worker";
import { useWorker } from "../../../Utility/WorkerHook";
import ReactMarkdown from 'react-markdown';
import Fullscreen from "react-full-screen";
import './AttemptChallenge.css';
import Pulse from "./PulseTest";

function AttemptChallenge(props) {

    const [challenge, setChallenge] = useState({id:null,difficulty:null,skeleton_function:"",tests:[],title:"",categories:[]});
    const [userSubmission, setUserSubmission] = useState({id:null,attempts:null,challenge_id:null,completed:false,solution:""});
    const [userMessage, setUserMessage] = useState({});
    const [output, setOutput] = useState([]);
    const [passed, setPassed] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [pulse,setPulse] = useState(false);

    const {result,error} = useWorker(worker_script,userMessage);
  
    useEffect(() => {
        const submissionReq = getSubmission(props.auth.accessToken,props.match.params.id);
        const challengeReq = getData(props.auth.accessToken,props.match.params.id);

        const attemptChallengeData = Promise.all([submissionReq,challengeReq]);

        attemptChallengeData
        .then(res => {
                const [{data:{0:submissionRes}}, {data:{0:challengeRes}}] = res; // destructuring to unpack response data to an object. Res is an array with two responses from axios. The final result is a an object for each request by destructuring res to two variables that are objects. The objects have properties named "data". Data is an array with a single element. The first index "0" is destructured to retreive an object. 
            
            if(challengeRes===undefined){
                props.history.replace("/challenges")
            } else {
                setChallenge(challengeRes);

            if (submissionRes===undefined){
                postSubmission(props.auth.accessToken,challengeRes.id,challengeRes.skeleton_function)
                .then(res => {
                    const newSubmissionRes = res.data;
                    setUserSubmission(newSubmissionRes);
                });
            } else {
                setUserSubmission(submissionRes);
                if(submissionRes.completed ){
                    setPassed(true);
                }
            }
            }
            
        });
    }, []);

    useEffect(() => {
    if(result.length===0){
        setOutput([]);
    } else {
        const resLen = result.length;
        switch (result[resLen-1].msg){
            case "run_code":
                setOutput(result);
                updateSubmission(props.auth.accessToken,userSubmission.solution,userSubmission.id,passed)
                .then()
                .catch();
                break;
            case "run_tests":
                const testResult = (result[resLen-1].result.toString()==='true' ? true : false);
                setPassed(testResult);
                pulseTest()
                updateSubmission(props.auth.accessToken,userSubmission.solution,userSubmission.id,false)
                .then()
                .catch();
                
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
        // setUserSubmission when the promised is resolved
        if(userSubmission.completed){
            setUserSubmission({...userSubmission,completed:false});
            updateSubmission(props.auth.accessToken,userSubmission.solution,userSubmission.id,false)
                .then()
                .catch();
        } else if(passed===true){
            setUserSubmission({...userSubmission,completed:true});
            updateSubmission(props.auth.accessToken,userSubmission.solution,userSubmission.id,true)
                .then()
                .catch();
            // Do network request to submit passed and completed state
        }
    }

    function resetChallenge(){
         updateSubmission(props.auth.accessToken,challenge.skeleton_function,userSubmission.id,false)
            .then(() => window.location.reload()) 
            .catch();
    }

    function pulseTest(){
        setPulse(true);
        setTimeout(() => {
            setPulse(false)
        },2000);
   }

    return (
        <div className="full-screenable-node">
            <Fullscreen enabled={isFull} onChange={fullscreenOnChange}>
            <div className="challenge-header-wrapper">
                <h3 className="challenge-header">{challenge.title}</h3>
                <div className="category-completed" >
                    <button className="fullscreen-button" onClick={goFull}>{isFull ? "Exit Full Screen" :"Go Fullscreen"}</button>
                    <div>
                        {
                            challenge.categories.map((e,index) =>{
                                if(index>2){
                                    return null
                                } else {
                                    return <span className="categories" key={e.id}>{e.name}</span>
                                }
                                
                            })
                        }
                    </div>
                    {
                        (userSubmission.completed ? <span className="completed">Completed</span>  : <span className="uncompleted">Uncompleted</span> )
                    }
                    <Pulse pulse={pulse} passed={passed}/>
                </div>
            </div>
            <div className="attempt-challenge-wrapper"> 
                <div className="top-panel">
                    <div className={(isFull ? "fullscreen-unnecessary-div":"unnecessary-div")}>
                        <div className="action-bar">
                            <button className="console-button" onClick={resetChallenge}>Reset Challenge</button>
                            <button disabled={userSubmission.completed}className="console-button" onClick={runTests}>Run Tests</button>
                            <button disabled={!passed} className="sub-button" onClick={submitChallenge}>{userSubmission.completed ? "Unsubmit to Edit" : "Submit Solution"}</button>
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
            </Fullscreen>
            
         </div>
    );
}

export default AttemptChallenge;


// console.log(submissionRes);
// console.log(challengeRes);
// const {id,difficulty,skeleton_function,tests,title,categories} = challengeRes.data[0];
// const {attempts,challenge_id,id:submID,completed,solution:userSolution} = submissionRes.data[0];
// console.log({id},{difficulty},{skeleton_function},{tests},{title},{categories});
// console.log({attempts},{challenge_id},{submID},{completed},{userSolution});