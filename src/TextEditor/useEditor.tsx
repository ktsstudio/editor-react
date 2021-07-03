import {  EditorBlock, Editor, EditorState, RichUtils, ContentBlock, Modifier } from 'draft-js';
import * as React from 'react';
import { BlockType, InlineStyle } from './config';
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
  currentBlockType: BlockType;
  setEditorRef: (editor: Editor) => void
  toHtml: () => void;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
}

const html = '<h1 style="text-align:center">Привет</h1><h2 style="text-align:right">Как делишки</h2>';

export const useEditor = (): EditorApi => {
  const editorRef = React.useRef<Editor | null>(null);
  const [state, setState] = React.useState(html ? EditorState.createWithContent(HTMLtoState(html)): EditorState.createEmpty());

  const setEditorRef = React.useCallback((editor: Editor) => {
    editorRef.current = editor;
  }, []);

  const focus = React.useCallback(() => {
    editorRef.current?.focus();
  }, [editorRef]);

  const toggleBlockType = React.useCallback((blockType: BlockType) => {
    setState((currentState) => RichUtils.toggleBlockType(currentState, blockType))
  }, []);

  const currentBlockType = React.useMemo(() => {
    const selection = state.getSelection();
    const content = state.getCurrentContent()
    const block = content.getBlockForKey(selection.getStartKey());
    return block.getType() as BlockType;
  }, [state]);

  const toggleInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
    setState((currentState) => RichUtils.toggleInlineStyle(currentState, inlineStyle))
  }, []);

  const hasInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
    const currentStyle = state.getCurrentInlineStyle();
    return currentStyle.has(inlineStyle);
  }, [state]);

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
    setEditorRef,
    toggleBlockType,
    currentBlockType,
    blockStyleFn,
    setBlockData,
    toggleInlineStyle,
    hasInlineStyle,
    toHtml
  }
}
