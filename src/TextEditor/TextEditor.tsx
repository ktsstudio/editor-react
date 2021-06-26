// TextEditor.tsx
import * as React from 'react';
import { Editor } from 'draft-js';
import { useEditor } from './useEditor';
import ToolPanel from './ToolPanel';
import cn from 'classnames';
import s from './TextEditor.module.scss';

export type TextEditorProps = {
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = () => {
  const ref = React.useRef<Editor | null>(null);
  const editorApi = useEditor(ref);

  return (
    <div>
      <ToolPanel editorApi={editorApi} />
      <div className={cn(s['text-editor'])}>
        <Editor
          spellCheck
          blockStyleFn={editorApi.blockStyleFn}
          ref={ref}
          // placeholder="Введите ваш текст"
          editorState={editorApi.state}
          onChange={editorApi.onChange}
        />
      </div>
    </div>
  );
}

export default TextEditor;
