import { ContentState } from "draft-js";
import * as React from "react";
import { useEditorApi } from "../context";

type LinkProps = {
  children: React.ReactNode;
  contentState: ContentState;
  entityKey: string;
};

const Link: React.FC<LinkProps> = ({ contentState, entityKey, children }) => {
  const { setEntityData } = useEditorApi();
  const { url, className } = contentState.getEntity(entityKey).getData();

  const handlerClick = () => {
    const newUrl = prompt("URL:", url);
    if (newUrl) {
      setEntityData(entityKey, { url: newUrl });
    }
  };

  return (
    <a href={url} onClick={handlerClick} className={className}>
      {children}
    </a>
  );
};

export default Link;
