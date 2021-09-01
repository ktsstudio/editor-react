import React from "react";
import TextEditor, { TextEditorProvider } from "./TextEditor";
import ToolPanel from "./ToolPanel";

function App() {
  return (
    <TextEditorProvider>
      <ToolPanel />
      <TextEditor />
    </TextEditorProvider>
  );
}

export default App;
