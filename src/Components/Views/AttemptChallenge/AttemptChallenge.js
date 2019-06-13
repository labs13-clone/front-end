import React, { useState, useEffect } from 'react';
import axios from "axios";
import Editor from "../../Shared/Editor/Editor";
import Console from "../../Shared/Console/Console";
import worker_script from "../../../Utility/worker";

function AttemptChallenge(props) {

    const [challenge, setChallenge] = useState([]);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState([]);
    const [passed, setPassed] = useState(false);
    const [submissionID, setSubmissionID] = useState(null);

    useEffect(() => {
        const accessToken = props.auth.accessToken;
         getSubmission(accessToken)
        .then(res=>{
            if(res.data.length === 0){
                getData(accessToken)
                .then(res => {
                    setChallenge(res.data[0]);
                    setCode(res.data[0].skeleton_function);
                    postSubmission(accessToken,res.data[0].skeleton_function)
                    .then(res => {
                        setSubmissionID(res.data.id)
    
                    });
                });

            } else {
                let userSub;
                res.data.forEach(subs => {
                    if(Number(subs.challenge_id)===Number(props.match.params.id)){
                        userSub = subs
                    }
                })

                setCode(userSub.solution);
                const subID = res.data.id;
                setSubmissionID(subID);
                getData(accessToken)
                .then(res => {
                    setChallenge(res.data[0]);
                });
            }
            });
        
        
        if (window.Worker) {
            window.worker = new Worker(worker_script);
              window.worker.onmessage = (e) => {
                setOutput([e.data.toString()]);
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
    }, []);

    

    async function getData(token) {
        try {
            const result = await axios({
                method: 'get', 
                url: `${process.env.REACT_APP_SERVER}/api/challenges?id=${props.match.params.id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
        }); 
            // setChallenge(result.data[0]);
            // setCode(result.data[0].solution);
            return result
        } catch (e) {
        }
    }

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

    async function updateSubmission(token,solution,subID) {
        try {
            const result = await axios({
                method: 'put', 
                url: `${process.env.REACT_APP_SERVER}/api/submissions`,
                headers: {
                    Authorization: `Bearer ${token}`
                         },
                data: {
                        id: subID,
                        completed: passed,
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
        updateSubmission(props.auth.accessToken,code,submissionID)
        .then()
        .catch()
    };

    function runTests(){
        window.worker.postMessage({msg:"run_tests",code,tests:challenge.tests});
    };
    
    return (
        <div>
            <Editor code={code} changeHandler={handleInputChange} mode={"javascript"}/>
            <div style={{width:550,"margin":"0px auto"}}>
                <button onClick={runCode}>Run Code</button>
                <button onClick={runTests}>Run Tests</button>
                <button onClick={clearConsole}>Clear Console</button>
            </div>
            <Console output={output}/>
        </div>
    );
}

export default AttemptChallenge;
