import * as React from 'react';
import { Editor } from 'draft-js';
import './TextEditor.scss';
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from './config';
import { useEditorApi } from './context';
import cn from 'classnames';

export type TextEditorProps = {
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ className }) => {
  const editorApi = useEditorApi();

  return (
    <div className={cn("text-editor", className)}>
      <Editor
        spellCheck
        customStyleMap={CUSTOM_STYLE_MAP}
        blockRenderMap={BLOCK_RENDER_MAP}
        blockStyleFn={editorApi.blockStyleFn}
        ref={editorApi.setEditorRef}
        placeholder="Введите ваш текст"
        editorState={editorApi.state}
        onChange={editorApi.onChange}
      />
    </div>
  );
}

export default TextEditor;
