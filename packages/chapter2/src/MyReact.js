import { createHooks } from './hooks';
import { render as updateElement } from './render';

function MyReact() {
  let root = null;
  let rComp = null;

  const _render = () => {
    resetHookContext();
    const jsxElement = rComp();

    updateElement(root, jsxElement);
  };

  function render($root, rootComponent) {
    root = $root;
    rComp = rootComponent;
    _render();
  }

  const {
    useState,
    useMemo,
    resetContext: resetHookContext,
  } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
