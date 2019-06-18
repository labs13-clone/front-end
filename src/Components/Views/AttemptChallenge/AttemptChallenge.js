import React, { useState, useEffect } from 'react';
import axios from "axios";
import Editor from "../../Shared/Editor/Editor";
import Console from "../../Shared/Console/Console";
import worker_script from "../../../Utility/worker";
import { useWorker } from "../../../Utility/WorkerHook";
import ReactMarkdown from 'react-markdown';
import Modal from '@material-ui/core/Modal';
import './AttemptChallenge.css';

function AttemptChallenge(props) {

    const [challenge, setChallenge] = useState({id:null,difficulty:null,skeleton_function:"",tests:[],title:"",categories:[]});
    const [userSubmission, setUserSubmission] = useState({id:null,attempts:null,challenge_id:null,completed:false,solution:""});
    const [userMessage, setUserMessage] = useState({});
    const [output, setOutput] = useState([]);
    const [passed, setPassed] = useState(false);
    const [modalState, setModalState] = useState(false);

    const {result,error} = useWorker(worker_script,userMessage);
  
    useEffect(() => {
        const submissionReq = getSubmission(props.auth.accessToken);
        const challengeReq = getData(props.auth.accessToken);

        const attemptChallengeData = Promise.all([submissionReq,challengeReq]);
        attemptChallengeData.then(res => {
        const [{data:{0:submissionRes}}, {data:{0:challengeRes}}] = res; // destructuring to unpack response data to an object. Res is an array with two responses from axios. The final result is a an object for each request by destructuring res to two variables that are objects. The objects have properties named "data". Data is an array with a single element. The first index "0" is destructured to retreive an object. 

            setChallenge(challengeRes);

            if (submissionRes===undefined){
                postSubmission(props.auth.accessToken,challengeRes.id,challengeRes.skeleton_function)
                .then(res => {
                    const newSubmissionRes = res.data;
                    console.log(newSubmissionRes);
                    setUserSubmission(newSubmissionRes);
                });
            } else {
                console.log(submissionRes);
                setUserSubmission(submissionRes);
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
                setUserSubmission({...userSubmission,completed:testResult});
                updateSubmission(props.auth.accessToken,userSubmission.solution,userSubmission.id,testResult)
                .then()
                .catch();
                break;
            default:
                break;
        };
    } 
    },[result]);
    
    
    async function getData(token) {
        try {
            const result = await axios({
                method: 'get', 
                url: `${process.env.REACT_APP_SERVER}/api/challenges?id=${props.match.params.id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
        }); 
            return result;
        } catch (e) {
        };
    };

    async function getSubmission(token) {
        try {
            const result = await axios({
                method: 'get', 
                url: `${process.env.REACT_APP_SERVER}/api/submissions?challenge_id=${props.match.params.id}`,
                headers: {
                            Authorization: `Bearer ${token}`,
                         }
        });
            //console.log(result,"get Submission")
            return result;
        } catch (e) {
        };
    };

    async function postSubmission(token,id,skeletonFunc) {
        try {
            const result = await axios({
                method: 'post', 
                url: `${process.env.REACT_APP_SERVER}/api/submissions`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data: {
                        solution:skeletonFunc,
                        challenge_id:id
                      }
        });
            return result;
        } catch (e) {
        };
    };

    async function updateSubmission(token,solution,subID,pass) {
        try {
            const result = await axios({
                method: 'put', 
                url: `${process.env.REACT_APP_SERVER}/api/submissions`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                         },
                data: {
                        id: subID,
                        completed: pass,
                        solution: solution
                      }
        });
            return result
        } catch (e) {
            console.log(e)
        };
    };

    function handleInputChange(editor, data, userCode){
        setUserSubmission({...userSubmission,solution:userCode});
    };

    function clearConsole(){
        setUserMessage("clear_console")
    };
    
    function runCode(){
        const solution = userSubmission.solution;
        setUserMessage({msg:"run_code",code:solution});
    };

    function runTests(){
        const solution = userSubmission.solution;
        setUserMessage({msg:"run_tests",code:solution,tests:challenge.tests});
    };

    function modalCallback(){
        setModalState(!modalState);
    }
    
    return (
        <div style={{"width":"900px", "margin":"0 auto"}}>
            <h3 style={{color:"black","marginBottom":"5px"}}>{challenge.title}</h3>
            <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","width":"900px", "margin":"0 auto"}}>
                <div>
                    {
                        challenge.categories.map(e =>{
                            return <span style={{"background":"grey","color":"white","margin":"5px","borderRadius":"5px","padding":"5px","fontSize":"12px"}}key={e.id}>{e.name}</span>
                        })
                    }
                </div>
                {
                    (userSubmission.completed ? <span style={{"color":"darkgreen","fontWeight":"bold"}}>Completed</span>  : <span style={{"color":"crimson","fontWeight":"bold"}}>Uncompleted</span> )
                }
            </div>
            <div style={{"display":"flex","justifyContent":"space-between","width":"900px", "margin":"0 auto"}}>  
                <Editor code={userSubmission.solution} changeHandler={handleInputChange} mode={"javascript"}/>
                <div style={{"background":"#263238",color:"white","padding":"10px","marginTop":"20px","textDecoration":"none","width":"430px", "height":"280px","overflow":"scroll"}}>
                    <h2 style={{"color":"white","marginTop":"0px","marginBottom":"0px"}}>Instructions</h2>
                    <ReactMarkdown source={challenge.description} />
                </div>
                <Modal onClick={modalCallback} open={modalState} children={
                    <div style={{"display":"flex","justifyContent":"center","alignItems":"center","width":"200px","height":"200px","background":"white","color":"black","left":"50%","top":"50%","position":"absolute","transform": "translate(-57%, -40%)"}} onClick={modalCallback}>
                        {
                            (passed ? <h4>Passed Tests!!!</h4> : <h4>Not All the Tests Passed</h4>)
                        }
                    </div>}
                />
                <br/>
                <div style={{"display":"flex","justifyContent":"space-between","alignItems":"center","width":"300px"}}>
                    <button onClick={runCode}>Run Code</button>
                    <button onClick={runTests}>Run Tests</button>
                    <button onClick={clearConsole}>Clear Console</button>
                </div>
                <Console output={output}/>
            </div>
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