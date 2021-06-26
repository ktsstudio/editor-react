import {  EditorBlock, Editor, EditorState, RichUtils, ContentBlock, Modifier } from 'draft-js';
import * as React from 'react';
import { BlockType } from './config';
import { HTMLtoState, stateToHTML } from './convert';

const blockStyleFn = (contentBlock: ContentBlock): string => {
  // const type = contentBlock.getType();

  const blockAlignment =
      contentBlock.getData() && contentBlock.getData().get('text-align');

  if (blockAlignment) {
      return `aligment-${blockAlignment}`;
  }

  return '';
}

export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
  focus: () => void;
  toggleBlockType: (blockType: BlockType) => void;
  blockStyleFn: (contentBlock: ContentBlock) => string;
  setBlockData: (data: {}) => void;
  toHtml: () => void;
}

const html = '<h1 style="text-align:center">Привет</h1><h2 style="text-align:right">Как делишки</h2>';

export const useEditor = (ref: React.MutableRefObject<Editor | null>): EditorApi => {

  const [state, setState] = React.useState(html ? EditorState.createWithContent(HTMLtoState(html)): EditorState.createEmpty());

  const focus = React.useCallback(() => {
    ref.current?.focus();
  }, [ref]);

  const toggleBlockType = React.useCallback((blockType: BlockType) => {
    setState((currentState) => RichUtils.toggleBlockType(currentState, blockType))
  }, []);

  const setBlockData = React.useCallback((data) => {
    setState((currentState) => {
      const newContentState = Modifier.setBlockData(
        currentState.getCurrentContent(),
        currentState.getSelection(),
        data
      );

      return EditorState.push(currentState, newContentState, 'change-block-data');
    })
  }, []);

  const toHtml = React.useCallback(() => {
    console.log(stateToHTML(state.getCurrentContent()));
  }, [state]);

  return {
    state,
    onChange: setState,
    focus,
    toggleBlockType,
    blockStyleFn,
    setBlockData,
    toHtml
  }
}
