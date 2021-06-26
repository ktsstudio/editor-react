import * as React from 'react';
import { useEditorApi } from '../TextEditor';
import { BlockType } from '../TextEditor/config';
import './ToolPanel.scss';

const ToolPanel:React.FC = () => {
  const { toggleBlockType } = useEditorApi();

  return (
    <div className="tool-panel">
      <button onClick={() => toggleBlockType(BlockType.h1)}>h1</button>
      <button onClick={() => toggleBlockType(BlockType.h2)}>h2</button>
      {/* <button onClick={() => toggleBlockType(BlockType.list)}>Atomic</button> */}
      {/* <button onClick={() => editorApi.setBlockData({ 'text-align': 'left' })}>left</button>
      <button onClick={() => editorApi.setBlockData({ 'text-align': 'center' })}>center</button>
      <button onClick={() => editorApi.setBlockData({ 'text-align': 'right' })}>right</button> */}
      {/* <button onClick={editorApi.toHtml}>Print</button> */}
    </div>
  );
}

export default ToolPanel;
