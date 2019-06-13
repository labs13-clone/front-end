import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';


require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/mode/javascript/javascript');

const Editor = (props) => {
  return (
    <div className="editor">
      <section className="playground">
        <div className="code-editor js-code">
          <div className="editor-header">JavaScript</div>
          <CodeMirror
            value={props.code}
            options={{
              mode: props.mode,
              theme: 'material',
              lineNumbers: true,
              scrollbarStyle: null,
              lineWrapping: true,
            }}
            onBeforeChange={props.changeHandler}
          />
        </div>
      </section>

    </div>
  );
}

export default Editor;
