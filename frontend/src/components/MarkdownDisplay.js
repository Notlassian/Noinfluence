
import React, { useEffect, useState } from 'react';

import {MDXEditor} from '@mdxeditor/editor';
import '../components/css/Document.css'

import '@mdxeditor/editor/style.css';
import {
  toolbarPlugin,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  diffSourcePlugin,
  markdownShortcutPlugin,
  KitchenSinkToolbar,
  AdmonitionDirectiveDescriptor
} from '@mdxeditor/editor';


export const MarkdownDisplay = ({ markdown, editEnabled, loading, onSave }) => {

  const simpleSandpackConfig = {
    defaultPreset: 'txt',
    presets: [
      {
        label: 'React',
        name: 'react',
        meta: 'live react',
        sandpackTemplate: 'react',
        sandpackTheme: 'light',
        snippetFileName: '/App.js',
        snippetLanguage: 'jsx',
        initialSnippetContent: "defaultSnippetContent"
      },
    ]
  }

  const [currentMarkdown, setCurrentMarkdown] = useState(markdown);
  const [savedMarkdown, setSavedMarkdown] = useState(markdown);
  const [readOnly, setReadOnly] = useState(true);
  const [editState, setEditState] = useState(false);

  const handleMarkdownChange = (newMarkdown) => {
    setCurrentMarkdown(newMarkdown);
  };

  const page = () => {
    if (readOnly) {
      return <div class="document-display">      
      <nav class="document-manager">
        { editEnabled ? <button id='edit-button' onClick={clickEdit}> edit </button> : null}
      </nav>
      <div class="background">
        <div class="document-container">
          <MDXEditor
            key={`${editState}`}
            contentEditableClassName="editable-document-page"
            class="document"
            markdown={currentMarkdown}
            plugins={[
              toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar/> }),
              listsPlugin(),
              quotePlugin(),
              headingsPlugin(),
              linkPlugin(),
              linkDialogPlugin(),
              imagePlugin(),
              tablePlugin(),
              thematicBreakPlugin(),
              frontmatterPlugin(),
              codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
              sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
              codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
              directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
              diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: savedMarkdown }),
              markdownShortcutPlugin()
            ]}
            readOnly
          />
        </div>
      </div>
    </div>

    }
    else {
      return <div class="document-display">
      <nav class="document-manager">
        <div id="save-cancel">
          <button id='save-button' onClick={clickSave}> save </button>
          <button id='cancel-button' onClick={clickCancel}> cancel </button>
        </div>
      </nav>
      <div class="background">
        <div class="document-container">
          <MDXEditor
            key={`${editState}`}
            contentEditableClassName="editable-document-page"
            class="document"
            markdown={currentMarkdown}
            plugins={[
              toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar/> }),
              listsPlugin(),
              quotePlugin(),
              headingsPlugin(),
              linkPlugin(),
              linkDialogPlugin(),
              imagePlugin(),
              tablePlugin(),
              thematicBreakPlugin(),
              frontmatterPlugin(),
              codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
              sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
              codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
              directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
              diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: savedMarkdown }),
              markdownShortcutPlugin()
            ]}
            onChange={(e) => handleMarkdownChange(e)}
          />
        </div>
      </div>
    </div>

    }
  };

  const clickEdit = () => {
    setReadOnly(false)
  };

  const clickSave = () => {

    setReadOnly(true)
    setEditState(!editState)
    setSavedMarkdown(currentMarkdown)
    
    onSave(currentMarkdown)
  };

  const clickCancel = () => {
    setReadOnly(true)
    setEditState(!editState)
    setCurrentMarkdown(savedMarkdown)
  };

  useEffect(() => {
    console.log("UseEffect triggered. Updated markdown:", markdown);
    setCurrentMarkdown(markdown);
    setSavedMarkdown(markdown);
  }, [markdown]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(markdown);
  console.log(savedMarkdown);

  if (!savedMarkdown) {
    return <div>No data available</div>;
  }

  return page()
};