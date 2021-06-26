import Immutable from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

export enum BlockType {
  h1 = 'header-one',
  h2 = 'header-two',
  h3 = 'header-three',
  h4 = 'header-four',
  h5 = 'header-five',
  h6 = 'header-six',
  blockquote = 'blockquote',
  code = 'code-block',
  list = 'unordered-list-item',
  orderList = 'ordered-list-item',
  cite = 'cite',
  default = 'unstyled',
}

export const BLOCK_LABELS = {
  [BlockType.h1]: 'Заголовок 1',
  [BlockType.h2]: 'Заголовок 2',
  [BlockType.h3]: 'Заголовок 3',
  [BlockType.h4]: 'Заголовок 4',
  [BlockType.h5]: 'Заголовок 5',
  [BlockType.h6]: 'Заголовок 6',
  [BlockType.blockquote]: 'Цитата',
  [BlockType.code]: 'Блок с кодом',
  [BlockType.list]: 'Маркированный список',
  [BlockType.orderList]: 'Нумерованный список',
  [BlockType.cite]: 'Сноска',
  [BlockType.default]: 'Обычный текст',
}

const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
  cite: {
    element: 'cite',
  },
});

export const BLOCK_RENDER_MAP = DefaultDraftBlockRenderMap.merge(CUSTOM_BLOCK_RENDER_MAP);
