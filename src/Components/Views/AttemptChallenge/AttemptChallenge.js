import React, { useState, useEffect } from 'react';
import axios from "axios";
import Editor from "../../Shared/Editor/Editor";
import Console from "../../Shared/Console/Console";
import worker_script from "../../../Utility/worker";
import ReactMarkdown from 'react-markdown';
import Modal from '@material-ui/core/Modal';

function AttemptChallenge(props) {

    const [challenge, setChallenge] = useState([]);
    const [categories, setCategories] = useState([]);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState([]);
    const [passed, setPassed] = useState(false);
    const [submissionID, setSubmissionID] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [completed, setCompleted] = useState(null);
    const [modalState, setModalState] = useState(false)

    useEffect(() => {
        const accessToken = props.auth.accessToken;
         getSubmission(accessToken)
        .then(res=>{
            setSubmission(res.data);
            if(res.data.length === 0){
                setCompleted(false)
                getData(accessToken)
                .then(res => {
                    setChallenge(res.data[0]);
                    setCode(res.data[0].skeleton_function);
                    setCategories(res.data[0].categories);
                    postSubmission(accessToken,res.data[0].skeleton_function)
                    .then(res => {
                        setSubmissionID(res.data.id);
                    });
                });

            } else {
                let userSub;
                setCompleted(res.data[0].completed);
                res.data.forEach(subs => {
                    if(Number(subs.challenge_id)===Number(props.match.params.id)){
                        userSub = subs;
                    }
                })

                setCode(userSub.solution);
                const subID = res.data[0].id;
                setSubmissionID(subID);
                getData(accessToken)
                .then(res => {
                    setChallenge(res.data[0]);
                    setCategories(res.data[0].categories);
                });
            }
            });
        
        
        if (window.Worker) {
            window.worker = new Worker(worker_script);
              window.worker.onmessage = (e) => {
                  switch (e.data.msg){
                    case "run_code":
                        setOutput([e.data.result.toString()]);
                        break;
                    case "run_tests":
                        const testResult = (e.data.result.toString()==='true' ? true : false)
                        setPassed(testResult);
                        setCompleted(testResult);
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
                };
        } else {
            console.log('Your browser doesn\'t support web workers.');
            // todo : send alert to user and redirect home
        };
        return () => {
            window.worker.terminate();
            window.worker = undefined;
        };
    }, []);


    useEffect(() => {

        if(submissionID!==null){
            updateSubmission(props.auth.accessToken,code,submissionID,passed)
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
                            Authorization: `Bearer ${token}`
                         }
        });
            return result;
        } catch (e) {
        };
    };

    async function postSubmission(token,skeletonFunc) {
        try {
            const result = await axios({
                method: 'post', 
                url: `${process.env.REACT_APP_SERVER}/api/submissions`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                        solution:skeletonFunc,
                        challenge_id:props.match.params.id
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
                    Authorization: `Bearer ${token}`
                         },
                data: {
                        id: subID,
                        completed: pass,
                        solution: solution
                      }
        });
            return result
        } catch (e) {
        };
    };

    function handleInputChange(editor, data, code){
        setCode(code);
    };

    function clearConsole(){
        setOutput([]);
    };
    
    function runCode(){
        window.worker.postMessage({msg:"run_code",code});
        updateSubmission(props.auth.accessToken,code,submissionID,passed)
        .then()
        .catch();
    };

    function runTests(){
        window.worker.postMessage({msg:"run_tests",code,tests:challenge.tests});
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
                        categories.map(e =>{
                            return <span style={{"background":"grey","color":"white","margin":"5px","borderRadius":"5px","padding":"5px","fontSize":"12px"}}key={e.id}>{e.name}</span>
                        })
                    }
                </div>
                {
                    (completed ? <span style={{"color":"darkgreen","fontWeight":"bold"}}>Completed</span>  : <span style={{"color":"crimson","fontWeight":"bold"}}>Uncompleted</span> )
                }
            </div>
            <div style={{"display":"flex","justifyContent":"space-between","width":"900px", "margin":"0 auto"}}>  
                <Editor code={code} changeHandler={handleInputChange} mode={"javascript"}/>
                <div style={{"background":"#263238",color:"white","padding":"10px","marginTop":"20px","textDecoration":"none","width":"430px", "height":"280px","overflow":"scroll"}}>
                    <h2 style={{"color":"white","marginTop":"0px","marginBottom":"0px"}}>Instructions</h2>
                    <ReactMarkdown source={challenge.description} />
                </div>
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
    );
}

export default AttemptChallenge;
