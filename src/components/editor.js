import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/javascript/javascript';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      js: ""
    };
  }

  runCode1 = () => {
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
                this.setState({ js: js });
              }}
              setValue={'abcd'}
            />
          </div>
        </section>
        <section className="result">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
        <button onClick={this.runCode1}>Run1</button>
      </div>
    );
  }
}

export default Editor;