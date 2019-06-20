
import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';


require('codemirror/lib/codemirror.css');
//require('codemirror/theme/duotone-light.css');
require('codemirror/mode/javascript/javascript');

const Editor = (props) => {
  return (
          <CodeMirror
            value={props.code}
            options={{
              mode: props.mode,
              lineNumbers: true,
              scrollbarStyle: null,
              lineWrapping: true,
              matchBrackets: true,
              autoCloseBrackets: true,
              readOnly:props.readOnly
            }}
            onBeforeChange={props.changeHandler}
          />
  );
}

export default Editor;