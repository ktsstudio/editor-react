import Immutable from "immutable";
import { DraftEditorCommand, DefaultDraftBlockRenderMap } from "draft-js";

export enum EntityType {
  link = "link",
}

export enum BlockType {
  h1 = "header-one",
  h2 = "header-two",
  h3 = "header-three",
  h4 = "header-four",
  h5 = "header-five",
  h6 = "header-six",
  blockquote = "blockquote",
  code = "code-block",
  list = "unordered-list-item",
  orderList = "ordered-list-item",
  cite = "cite",
  default = "unstyled",
}

export enum InlineStyle {
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  UNDERLINE = "UNDERLINE",
  ACCENT = "ACCENT",
}

export const BLOCK_LABELS = {
  [BlockType.h1]: "Заголовок 1",
  [BlockType.h2]: "Заголовок 2",
  [BlockType.h3]: "Заголовок 3",
  [BlockType.h4]: "Заголовок 4",
  [BlockType.h5]: "Заголовок 5",
  [BlockType.h6]: "Заголовок 6",
  [BlockType.blockquote]: "Цитата",
  [BlockType.code]: "Блок с кодом",
  [BlockType.list]: "Маркированный список",
  [BlockType.orderList]: "Нумерованный список",
  [BlockType.cite]: "Сноска",
  [BlockType.default]: "Обычный текст",
};

export type KeyCommand = DraftEditorCommand | "accent";

const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
  [BlockType.cite]: {
    element: "cite",
  },
});

export const BLOCK_RENDER_MAP = DefaultDraftBlockRenderMap.merge(
  CUSTOM_BLOCK_RENDER_MAP
);

export const CUSTOM_STYLE_MAP = {
  [InlineStyle.ACCENT]: {
    backgroundColor: "#F7F6F3",
    color: "#A41E68",
  },
};
