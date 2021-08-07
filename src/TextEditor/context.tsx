import * as React from 'react';
import { EditorApi, useEditor } from './useEditor';

const TextEditorContext = React.createContext<EditorApi | undefined>(undefined);

export const TextEditorProvider: React.FC = ({ children }) => {
  const editorApi = useEditor('<h1>Заголовок</h1><p><span class="accent" style="background-color:#F7F6F3;color:#A41E68">Простой </span><em>текст </em>и <a href="https://test.ru">ссылка</a> и <strong>еще </strong>текст</p>');

  return (
    <TextEditorContext.Provider value={editorApi}>
      {children}
    </TextEditorContext.Provider>
  )
}

export const useEditorApi = () => {
  const context = React.useContext(TextEditorContext);
  if (context === undefined) {
    throw new Error('useEditorApi must be used within TextEditorProvider');
  }

  return context;
}
