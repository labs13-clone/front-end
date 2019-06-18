import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Editor from "../../Shared/Editor/Editor";
import Console from "../../Shared/Console/Console";
import worker_script from "../../../Utility/worker";
import ReactMarkdown from 'react-markdown';
import Modal from '@material-ui/core/Modal';
import './AttemptChallenge.css';

function AttemptChallenge(props) {

    const [challenge, setChallenge] = useState({id:null,difficulty:null,skeleton_function:"",tests:[],title:"",categories:[]});
    const [userSubmission, setUserSubmission] = useState({id:null,attempts:null,challenge_id:null,completed:false,solution:""});
    const [output, setOutput] = useState([]);
    const [passed, setPassed] = useState(false);
    const [modalState, setModalState] = useState(false)

    const lastWorker = useRef(null);

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
        if (window.Worker) {
            var worker = new Worker(worker_script);

            lastWorker.current = worker;
            //   let dispatchSafe = action => dispatch(action);
            //   worker.onmessage = e => dispatchSafe({ type: 'result', result: e.data });
            //   worker.onerror = () => dispatchSafe({ type: 'error' });
            //   worker.onmessageerror = () => dispatchSafe({ type: 'messageerror' });



            worker.onmessage = (e) => {
                switch (e.data.msg){
                  case "run_code":
                      setOutput([e.data.result.toString()]);
                      break;
                  case "run_tests":
                      const testResult = (e.data.result.toString()==='true' ? true : false)
                      setPassed(testResult);
                      setUserSubmission({...userSubmission,completed:testResult})
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
            worker.onerror = (e) => {
              worker.terminate();
              };
    
        } else {
                console.log('Your browser doesn\'t support web workers.');
                // todo : send alert to user and redirect home
        };

        return (worker) => {
            worker.terminate();
            worker = undefined;
        };


    },[worker])
   


    useEffect(() => {
        const token = props.auth.accessToken;
        const solution = userSubmission.solution;
        const id = userSubmission.id;
        if(userSubmission.id!==null){
            updateSubmission(token,solution,id,passed)
            .then()
            .catch();
        }
    },[passed]);
    
    
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
setUserSubmission({...userSubmission,solution:userCode})
    };

    function clearConsole(){
        setOutput([]);
    };
    
    function runCode(){
        const token = props.auth.accessToken;
        const id = userSubmission.id;
        const solution = userSubmission.solution;
        window.worker.postMessage({msg:"run_code",code:solution});
        updateSubmission(token,solution,id,passed)
            .then(res => console.log("update sub res",res))
            .catch(err => console.log("update sub err",err));
    };

    function runTests(){
        const solution = userSubmission.solution;
        window.worker.postMessage({msg:"run_tests",code:solution,tests:challenge.tests});
        // setModalState(!modalState);
        // updateSubmission(props.auth.accessToken,code,submissionID,passed)
        // .then()
        // .catch();

    };

    function modalCallback(){
        setModalState(!modalState)
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