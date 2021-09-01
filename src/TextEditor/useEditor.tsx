import { KeyBindingUtil, getDefaultKeyBinding, DraftHandleValue, CompositeDecorator, DraftEntityMutability, Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import * as React from 'react';
import { BlockType, EntityType, InlineStyle, KeyCommand } from './config';
import { HTMLtoState, stateToHTML } from './convert';
import LinkDecorator from './Link';

export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
  focus: () => void;
  toggleBlockType: (blockType: BlockType) => void;
  setBlockData: (data: {}) => void;
  currentBlockType: BlockType;
  setEditorRef: (editor: Editor) => void
  toHtml: () => string;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
  addLink: (url: string) => void;
  setEntityData: (entityKey: string, data: Record<string, string>) => void;
  handleKeyCommand: (command: KeyCommand, editorState: EditorState) => DraftHandleValue;
  handlerKeyBinding: (e: React.KeyboardEvent) => KeyCommand | null
}

const decorator = new CompositeDecorator([LinkDecorator]);

export const useEditor = (html?: string): EditorApi => {
  const editorRef = React.useRef<Editor | null>(null);
  const [state, setState] = React.useState(html ? EditorState.createWithContent(HTMLtoState(html), decorator): EditorState.createEmpty(decorator));

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
    console.log(block.toJS());
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

  const setEntityData = React.useCallback((entityKey, data) => {
    setState((currentState) => {
      const content = currentState.getCurrentContent()
      const contentStateUpdated = content.mergeEntityData(
        entityKey,
        data,
      )
      return EditorState.push(currentState, contentStateUpdated, 'apply-entity');
    })
  }, []);

  const addEntity = React.useCallback((entityType: EntityType, data: Record<string, string>, mutability: DraftEntityMutability) => {
    setState((currentState) => {
      const contentState = currentState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newState = EditorState.set(currentState, { currentContent: contentStateWithEntity });
      return RichUtils.toggleLink(newState, newState.getSelection(), entityKey);
    })
  }, []);

  const addLink = React.useCallback((url) => {
    addEntity(EntityType.link, { url }, 'MUTABLE')
  }, [addEntity]);

  const handleKeyCommand = React.useCallback((command: KeyCommand, editorState: EditorState) => {
    if (command === 'accent') {
      toggleInlineStyle(InlineStyle.ACCENT);
      return 'handled';
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setState(newState);
      return 'handled';
    }

    return 'not-handled';
  }, [toggleInlineStyle]);

  const handlerKeyBinding = React.useCallback((e: React.KeyboardEvent) => {
    if (e.keyCode === 81 && KeyBindingUtil.hasCommandModifier(e)) {
      return 'accent';
    }

    return getDefaultKeyBinding(e);
  }, []);

  const toHtml = React.useCallback(() => {
    return stateToHTML(state.getCurrentContent());
  }, [state]);

  return {
    state,
    onChange: setState,
    focus,
    setEditorRef,
    toggleBlockType,
    currentBlockType,
    setBlockData,
    toggleInlineStyle,
    hasInlineStyle,
    toHtml,
    addLink,
    setEntityData,
    handleKeyCommand,
    handlerKeyBinding
  }
}
