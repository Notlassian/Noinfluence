
import React, { useState, useEffect } from 'react';

import {MDXEditor} from '@mdxeditor/editor';
import '../components/Document.css'
import '../components/DocumentManagementBar.css'

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


export const Page = () => {
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

  const [currentMarkdown, setCurrentMarkdown] = useState(null);
  const [savedMarkdown, setSavedMarkdown] = useState(null);
  const [readOnly, setReadOnly] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleMarkdownChange = (newMarkdown) => {
    setCurrentMarkdown(newMarkdown);
  };

  useEffect(() => {
    fetch('readme.md')  // Replace with API endpoint
      .then(response => response.text())
      .then(response => {
        setSavedMarkdown(response)
        setCurrentMarkdown(response)

        setLoading(false)
      }) 
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      }); 
  }, []);

  function editor(readOnly) {
    if (readOnly) {
      return <div> 
        readOnly
        <p>{savedMarkdown}</p>
        <MDXEditor
          contentEditableClassName="editable-document-page"
          class="document"
          markdown={savedMarkdown}
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
    } 
    else {
      return <div> 
      readWrite
      <p>{savedMarkdown}</p>
      <MDXEditor
        contentEditableClassName="editable-document-page"
        class="document"
        markdown={savedMarkdown}
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
    }
  }


  const clickEdit = () => {
    const editButton = document.getElementById("edit-button");
    const saveCancel = document.getElementById("save-cancel");

    editButton.style.visibility = 'hidden';
    saveCancel.style.visibility = 'visible';
    setReadOnly(false)
  };

  const clickSave = () => {
    const editButton = document.getElementById("edit-button");
    const saveCancel = document.getElementById("save-cancel");

    editButton.style.visibility = 'visible';
    saveCancel.style.visibility = 'hidden';

    setReadOnly(true)
    setCurrentMarkdown(currentMarkdown)
    setSavedMarkdown(currentMarkdown)
    /*
    TODO:
    Post the markdown to the api endpoint that accepts file changes
    */
  };

  const clickCancel = () => {
    const editButton = document.getElementById("edit-button");
    const saveCancel = document.getElementById("save-cancel");

    editButton.style.visibility = 'visible';
    saveCancel.style.visibility = 'hidden';    

    setReadOnly(true)
    setCurrentMarkdown(savedMarkdown)
    setSavedMarkdown(savedMarkdown)
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!savedMarkdown) {
    return <div>No data available</div>;
  }
  else {
    if (readOnly) {
      return (
        <div class="page">
          <nav class="document-manager">
            <button id='edit-button' onClick={clickEdit}> edit </button>
            <div id="save-cancel">
              <button id='save-button' onClick={clickSave}> save </button>
              <button id='cancel-button' onClick={clickCancel}> cancel </button>
            </div>
          </nav>
          <div class="background">
            <div class="document-container">
              {editor(true)}
            </div>
          </div>
        </div>
    
      );
    }
    else {
      return (
        <div class="page">
          <nav class="document-manager">
            <button id='edit-button' onClick={clickEdit}> edit </button>
            <div id="save-cancel">
              <button id='save-button' onClick={clickSave}> save </button>
              <button id='cancel-button' onClick={clickCancel}> cancel </button>
            </div>
          </nav>
          <div class="background">
            <div class="document-container">
            {editor(false)}
            </div>
          </div>
        </div>
    
      );
    }
  }
};