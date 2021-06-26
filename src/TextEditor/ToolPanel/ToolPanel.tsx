import * as React from 'react';
import { BlockType } from '../config';
import { EditorApi } from '../useEditor';
import s from './ToolPanel.module.scss';

type Props = {
  editorApi: EditorApi;
}

const ToolPanel:React.FC<Props> = ({ editorApi } ) => {
  return (
    <div className={s['tool-panel']}>
      <button onClick={() => editorApi.toggleBlockType(BlockType.h1)}>h1</button>
      <button onClick={() => editorApi.toggleBlockType(BlockType.h2)}>h2</button>
      <button onClick={() => editorApi.toggleBlockType(BlockType.atomic)}>Atomic</button>
      <button onClick={() => editorApi.setBlockData({ 'text-align': 'left' })}>left</button>
      <button onClick={() => editorApi.setBlockData({ 'text-align': 'center' })}>center</button>
      <button onClick={() => editorApi.setBlockData({ 'text-align': 'right' })}>right</button>
      <button onClick={editorApi.toHtml}>Print</button>
    </div>
  );
}

export default React.memo(ToolPanel);
