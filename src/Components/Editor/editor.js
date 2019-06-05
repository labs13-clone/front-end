import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Console from './console.js'
import worker_script from "./worker";

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/mode/javascript/javascript');

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      js: "",
      output: []
    };
  }

  componentDidMount(){
    if (window.Worker) {
        this.worker = new Worker(worker_script);
          this.worker.onmessage = (e) => {
            this.setState({
              output:[...this.state.output,e.data.toString()]
            });
          }
            this.worker.onerror = (e) => {
            this.worker.terminate()
            }
    } else {
        console.log('Your browser doesn\'t support web workers.')
    }
  }

  componentWillUnmount(){
    this.worker.terminate();
  }

  runCode = () => {
    this.worker.postMessage(this.state.js);
  }

  clearConsole = () => {
    this.setState({
        output:[]
    });
  }

  killWorker = () => {
    this.worker.terminate();
  }

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
        <button onClick={this.runCode}>Run Code</button>
        <button onClick={this.clearConsole}>Clear Console</button>
        <button onClick={this.killWorker}>Kill Worker</button>
        <Console output={this.state.output}/>
      </div>
    );
  }
}

export default Editor;
