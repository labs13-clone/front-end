const workercode = () => {

    self.onmessage = function(e) { // eslint-disable-line no-restricted-globals
        try{
            
            const testFunc = function(){
                "use strict";
                return eval(`${e.data}`);
            }

            const capture = testFunc();
            if(capture===undefined){
                self.postMessage("undefined"); // eslint-disable-line no-restricted-globals
            } else{
                self.postMessage(capture); // eslint-disable-line no-restricted-globals
            }

        }catch(err){
            self.postMessage(err.stack.toString()); // eslint-disable-line no-restricted-globals
    }
    }
};

let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

export default worker_script;
