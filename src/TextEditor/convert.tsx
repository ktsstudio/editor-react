import { convertFromHTML, convertToHTML } from 'draft-convert';
import { BlockType } from './config';

export const stateToHTML = convertToHTML({
  blockToHTML: (block): React.ReactElement | null => {
    // @ts-ignore
    const type = block.type as BlockType;

    const style = {
      textAlign: block.data?.['text-align']
    }

    console.log(block);
    switch (type) {
      case BlockType.h1:
        return <h1 style={style} />;
      case BlockType.h2:
        return <h2 style={style} />;
      case BlockType.atomic:
          return <figure style={style} />;
      case BlockType.unstyled:
        return <p style={style} />;
      default:
        return null;
    }
  },
});

//@ts-ignore
export const HTMLtoState = convertFromHTML({
  htmlToBlock(nodeName: string, node: HTMLElement, last: string): any {
    switch (nodeName) {
      case 'h1':
        return {
          type: BlockType.h1,
          data: {
            'text-align': node.style.textAlign,
          }
        };
      case 'h2':
        return {
          type: BlockType.h2,
          data: {
            'text-align': node.style.textAlign,
          }
        };
      case 'div':
      case 'p':
        return BlockType.unstyled;
      default:
        return null;
    }
  },
});
