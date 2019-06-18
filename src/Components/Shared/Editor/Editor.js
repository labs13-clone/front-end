import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';


require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/mode/javascript/javascript');

const Editor = (props) => {
  return (
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
  );
}

export default Editor;