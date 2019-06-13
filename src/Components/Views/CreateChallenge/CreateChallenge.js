import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';

import Editor from '../../Shared/Editor/Editor';
import "./CreateChallenge.css"


function CreateChallenge(props) {
    let [markdownInput, setMarkdownInput] = useState('')

    function handleInputChange(editor, data, code){
        setMarkdownInput(code);
    }

    
    let [tests, setTests] = useState([{value1: "", value2: "", value3: ""}])
    let [buttonState, setButtonState] = useState(true)

    useEffect(() => {
        const myArray = tests.map(e => {
            if(e.value1 !== "" && e.value2 !== "" && e.value3 !== ""){
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
        console.log(bool);
        setButtonState(bool);
    }, [tests]);


    function addTest(e) {
        e.preventDefault();
        const values = [...tests]
        values.push({value1: "", value2: "", value3: ""});
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
    }

    let [javascriptInput, setJavascriptInput] = useState('')

    function handleInputChange(editor, data, code){
        setJavascriptInput(code);
    }

    return(
        <div>
            <div className="meta-container">
                <h3>Meta</h3>
                <form>
                    <h4>Title</h4>
                    <input/>
                    <h4>Difficulty</h4>
                    <input/>
                    <h4>Tags</h4>
                    <input/>
                </form>
            </div>
            <div className="instructions-container">
                <h3>instructions</h3>
                <p>we are going to pull a paragraph from backend and will render here.</p>
            </div>
            <div className="creation-editor-container">
                <Editor
                    input={markdownInput}
                    theme={'material'}
                    mode={'markdown'}
                    changeHandler={handleInputChange}
                    auth={props.auth}
                />
                <ReactMarkdown source={markdownInput} className="markdown-render"/>
            </div>
            <div>
                <form>
                    {tests.map((test, index) => {
                        return (<div>
                            <h2>Test {index + 1}</h2>
                            <input
                                value={tests[index].value1}
                                name="value1"
                                placeholder="descriptor"
                                onChange={e => handleChanges(index, e)}
                                required
                            />
                            <input
                                value={tests[index].value2}
                                name="value2"
                                placeholder="arguments"
                                onChange={e => handleChanges(index, e)}
                                required
                            />
                            <input
                                value={tests[index].value3}
                                name="value3"
                                placeholder="expected return value"
                                onChange={e => handleChanges(index, e)}
                                required
                            />
                            <button id={index} onClick={e => removeTest(e)}>Remove Test</button>
                        </div>)
                    })}
                <button disabled={!buttonState} onClick={(e) => addTest(e)}>Add Test</button>
                <button disabled={!buttonState}>Submit</button>
                </form>
            </div>
            <div>
                <div>
                    <Editor
                        input={javascriptInput}
                        theme={'material'}
                        mode={'javascript'}
                        changeHandler={handleInputChange}
                        auth={props.auth}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateChallenge;
