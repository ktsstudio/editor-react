import * as React from 'react';
import { useEditorApi } from '../TextEditor';
import cn from 'classnames';
import { BlockType, InlineStyle } from '../TextEditor/config';
import './ToolPanel.scss';

const ToolPanel:React.FC = () => {
  const { addLink, toggleBlockType, currentBlockType, toggleInlineStyle, hasInlineStyle } = useEditorApi();

  return (
    <div className="tool-panel">
      <button className={cn('tool-panel__item',  currentBlockType === BlockType.h1 && 'tool-panel__item_active')} onMouseDown={(e) => {
        e.preventDefault();
        toggleBlockType(BlockType.h1);
      }}>h1</button>
      <button className={cn('tool-panel__item',  currentBlockType === BlockType.h2 && 'tool-panel__item_active')} onMouseDown={(e) => {
        e.preventDefault();
        toggleBlockType(BlockType.h2);
      }}>h2</button>
      <button className={cn('tool-panel__item',  currentBlockType === BlockType.cite && 'tool-panel__item_active')} onMouseDown={(e) => {
        e.preventDefault();
        toggleBlockType(BlockType.cite);
      }}>cite</button>
      <button className={cn('tool-panel__item',  currentBlockType === BlockType.default && 'tool-panel__item_active')} onMouseDown={(e) => {
        e.preventDefault();
        toggleBlockType(BlockType.default);
      }}>Просто текст</button>

      {
        Object.values(InlineStyle).map((v) => (
          <button key={v} className={cn('tool-panel__item',  hasInlineStyle(v) && 'tool-panel__item_active')} onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle(v);
          }}>{v}</button>
        ))
    }

    <button onClick={() => {
      const url = prompt('URL:');
      if (url) {
        addLink(url);
      }
    }}>
      LINK
    </button>
      {/* <button onClick={() => toggleBlockType(BlockType.list)}>Atomic</button> */}
      {/* <button onClick={() => editorApi.setBlockData({ 'text-align': 'left' })}>left</button>
      <button onClick={() => editorApi.setBlockData({ 'text-align': 'center' })}>center</button>
      <button onClick={() => editorApi.setBlockData({ 'text-align': 'right' })}>right</button> */}
      {/* <button onClick={editorApi.toHtml}>Print</button> */}
    </div>
  );
}

export default ToolPanel;
