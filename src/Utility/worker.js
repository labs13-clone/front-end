const workercode = () => {

var pSlice = Array.prototype.slice;
var objectKeys = Object.keys
var isArguments = function supported(object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
  };

var deepEqual = function (actual, expected, opts) {
  if (!opts) opts = {};

  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  if (a.prototype !== b.prototype) return false;

  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {
    return false;
  }

  if (ka.length != kb.length)
    return false;
  ka.sort();
  kb.sort();
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }

  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

let _tmp_build_4e72d605dfab05b7ab8326d010a1b739_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = {}

class Test {
    constructor(params) {
        this.tests = params.tests;
        this.solution = params.solution;
        this.results = [];
        this.passed = true;
        
        this.tests.forEach(({descriptor, argumentsToPass, expectedResult}) => {

            argumentsToPass = argumentsToPass.map(arg => {
                if(typeof arg === 'array' || typeof arg === 'object' || typeof arg === 'string') {
                    return JSON.stringify(arg);
                } else {
                    return arg;
                }
            });

            
            const solution = eval(`(${this.solution}\n)`);
            const result = eval(`(solution(${argumentsToPass}))`);
            if(!deepEqual(result, expectedResult)) this.passed = false;

            this.results.push({
                descriptor,
                passed: deepEqual(result, expectedResult)
            });
        });
    }
}

    self.onmessage = function(e) { // eslint-disable-line no-restricted-globals
            switch (e.data.msg) {
                case 'run_code':
                    try{
                      console.log(e.data)
                        const testFunc = function(){
                            "use strict";
                            return eval(`${e.data.code}`);
                        }

                        const capture = testFunc();
                        if(capture===undefined){
                          self.postMessage({msg:"run_code",result:"undefined"}); // eslint-disable-line no-restricted-globals
                          //self.postMessage("undefined"); // eslint-disable-line no-restricted-globals
                        } else{
                          self.postMessage({msg:"run_code",result:capture}); // eslint-disable-line no-restricted-globals
                          //self.postMessage(capture); // eslint-disable-line no-restricted-globals
                        }
                    }catch(err){
                        self.postMessage({msg:"run_code",result:err.stack.toString()}); // eslint-disable-line no-restricted-globals

                        //self.postMessage(err.stack.toString()); // eslint-disable-line no-restricted-globals
                    }
                    break;
                case 'run_tests':
                    try{
                        const solution = e.data.code
                        const tests = e.data.tests
                        const runTest = new Test({solution:solution,tests:tests});
                        
                        //self.postMessage(runTest.passed); // eslint-disable-line no-restricted-globals
                        self.postMessage({msg:"run_tests",result:runTest.passed}); // eslint-disable-line no-restricted-globals

                    }catch(err){
                        self.postMessage({msg:"run_code",result:err.stack.toString()}); // eslint-disable-line no-restricted-globals
                        //self.postMessage(err.stack.toString()); // eslint-disable-line no-restricted-globals
                    }
                    break;
                default:
                    break;
              }
    }
};

let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

export default worker_script;
