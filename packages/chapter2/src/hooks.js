export function createHooks(callback) {
  const arrValue = [];
  let idx = 0;

  const useState = (initState) => {
    const key = idx;
    if(arrValue.length === key) {
      arrValue.push(initState);
    }
    
    const setState = (newVal) => {
      if (arrValue[key] === newVal) return;
      arrValue[key] = newVal;
      callback();
    }

    const state = arrValue[key];

    idx++;
    return [state, setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
  }

  return { useState, useMemo, resetContext };
}
