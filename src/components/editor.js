import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/javascript/javascript';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      js: "",
      editor: ""
    };
  }

  runCode = () => {
    const { js } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = 
      `<script type="text/javascript">
        ${js}
      </script>`;

    document.open();
    document.write(documentContents);
    document.close();
    console.log(this.state)
  };

  render() {

    return (
      <div className="editor">
        <section className="playground">
          <div className="code-editor js-code">
            <div className="editor-header">JavaScript</div>
            <CodeMirror
              value={this.state.js}
              options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
                scrollbarStyle: null,
                lineWrapping: true,
              }}
              onBeforeChange={(editor, data, js) => {
                this.setState({ 
                  js: js, 
                  editor: editor.getRange(
                    {line: 1, ch: 0}, 
                    {line: 2, ch: 0})
                });
              }}
              setValue={'abcd'}
            />
          </div>
        </section>
        <section className="result">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
        <button onClick={this.runCode}>Run</button>
        <div className="tests">
          <h1>Tests</h1>
          <p>test no. 1</p>
          <p>test no. 2</p>
          <p>test no. 3</p>
          <p>test no. 4</p>
        </div>
        <div className="console">
          <h1>Result</h1>
        </div>
      </div>
    );
  }
}

export default Editor;