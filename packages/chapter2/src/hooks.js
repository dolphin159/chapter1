export function createHooks(callback) {
  const arrValue = [];
  let arrMemo = [];
  let idx = 0;

  const useState = (initState) => {
    const key = idx;
    if (arrValue.length === key) {
      arrValue.push(initState);
    }

    const setState = (newVal) => {
      if (arrValue[key] === newVal) return;
      arrValue[key] = newVal;
      callback();
    };

    const state = arrValue[key];

    idx++;
    return [state, setState];
  };

  const useMemo = (fn, refs) => {
    const key = idx;
    const bChanged = arrMemo[key]
      ? !refs.every((v, i) => v === arrMemo[key][1][i])
      : true;

    if (bChanged) {
      const newMemo = fn();
      arrMemo[key] = [newMemo, refs];
      idx++;
      return newMemo;
    } else {
      idx++;
      return arrMemo[key][0];
    }
  };

  const resetContext = () => {
    idx = 0;
  };

  return { useState, useMemo, resetContext };
}
