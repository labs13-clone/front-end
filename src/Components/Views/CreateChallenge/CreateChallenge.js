import React, { useState } from 'react'
import {ReactDOM, render} from 'react-dom'
import ReactMarkdown from 'react-markdown';

import Editor from '../../Shared/Editor/Editor';
import "./CreateChallenge.css";


function CreateChallenge() {
    let [input, setInput] = useState('')

    function handleInputChange(editor, data, code){
        setInput(code);
        console.log(code)
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
                    input={input}
                    theme={'material'}
                    mode={'markdown'}
                    changeHandler={handleInputChange}
                />
                <ReactMarkdown source={input} className="markdown-render"/>
            </div>
        </div>
    )
}

export default CreateChallenge;
