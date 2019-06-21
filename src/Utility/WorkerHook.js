// The following code is modified from https://github.com/dai-shi/react-hooks-worker

import {
    useEffect,
    useMemo,
    useRef,
    useReducer,
  } from 'react';
  
  const initialState = { result: [], error: null };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'init':
        return initialState;
      case 'result':
        return { result: [...state.result, {msg:action.result.msg,result:action.result.result.toString()}], error: null };
      case 'clear':
        return { result: [], error: null };
      case 'error':
        return { result: [], error: 'error' };
      case 'messageerror':
        return { result: [], error: 'messageerror' };
      default:
        throw new Error('no such action type');
    }
  };
  
  const createWorker = (func) => {
    return new Worker(func);
  };
  
  export const useWorker = (func, input) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const worker = useMemo(() => createWorker(func), [func]);
    const lastWorker = useRef(null);
    useEffect(() => {
      lastWorker.current = worker;
      let dispatchSafe = action => dispatch(action);
      worker.onmessage = e => dispatchSafe({ type: 'result', result: e.data });
      worker.onerror = () => dispatchSafe({ type: 'error' });
      worker.onmessageerror = () => dispatchSafe({ type: 'messageerror' });
      const cleanup = () => {
        dispatchSafe = () => null; // we should not dispatch after cleanup.
        worker.terminate();
        dispatch({ type: 'init' });
      };
      return cleanup;
    }, [worker]);
    useEffect(() => {
        if(input==="clear_console"){
            dispatch({ type: 'clear'});
        } else {
            lastWorker.current.postMessage(input);
        }
    }, [input]);
    return state;
  };