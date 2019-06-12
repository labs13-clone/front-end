import React from 'react'
import {ReactDOM, render} from 'react-dom'
import MarkdownJsx from 'markdown-to-jsx';
import ReactMarkdown from 'react-markdown';

import Editor from '../../Shared/Editor/Editor';

// render(
//     <Markdown>
//         # Hi
//     </Markdown>,
//     document.body);

class CreateChallenge extends React.Component {
    constructor() {
        super()
        this.state = {
            code: ''
        }
    }

    render() {
        const input = '# heading \n\n * bold \n ## this is [h2](https://github.com/rexxars/react-markdown)\n\n '
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
                <div id="markdown">

                </div>
                <ReactMarkdown source={input} />
                    
                <ol>
                    <li>bold</li>
                </ol>
                <div className="creation-editor-container">
                    <Editor/>
                    <h1>Hi</h1>
                </div>
            </div>
        )
    }
}

export default CreateChallenge;
