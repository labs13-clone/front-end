import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Console from '../Console/Console'
import worker_script from "../../../Utility/worker";
import axios from "axios";

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/mode/javascript/javascript');

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      js: "",
      output: [],
      challenges:[]
    };
  }

  componentDidMount() {
    axios
    .get("https://clone-coding-server.herokuapp.com/api/challenges", {headers:{Authorization: `Bearer ${this.props.auth.accessToken}`}})
    .then(data => {
      this.setState({
        challenges:data.data,
        js:data.data[1].solution
      })
    })
    .catch((err) => console.log(err))

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
                mode: 'markdown',
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
        {
          this.state.challenges.map((challenge)=> {
            return <div key={challenge.title} style={{border: '1px solid black'}}>
                    <p>{challenge.title}</p>
                    <p>{challenge.description}</p>
                  </div>
          })
        }
      </div>
    );
  }
}

export default Editor;
