
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
  const [markdown, setMarkdown] = useState('');

  const handleMarkdownChange = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

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

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('readme.md')  // Replace with API endpoint
      .then(response => response.text())
      .then(response => {
        setData({
          md: response
        })
        console.log(data)
        setLoading(false)
      }) 
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      }); 
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  } 


  const editor = <MDXEditor
      contentEditableClassName="editable-document-page"
      class="document"
      markdown={data.md}
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
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
        markdownShortcutPlugin()
      ]}
      onChange={(e) => console.log(e)} 
  />;


  const clickEdit = () => {
    const editButton = document.getElementById("edit-button");
    const saveCancel = document.getElementById("save-cancel");

    editButton.style.visibility = 'hidden';
    saveCancel.style.visibility = 'visible';

    const docPage = document.getElementsByClassName("editable-document-page")[0]
    docPage.setAttribute("contenteditable", "true");

    const toolbar = document.getElementsByClassName("mdxeditor-toolbar")[0]
    toolbar.style.display = 'flex';

    /*
    TODO:
    convert html back to markdown
    */
    //markdownValue = "value of markdown in editor before edits are made"
  };

  const clickSave = () => {
    const editButton = document.getElementById("edit-button");
    const saveCancel = document.getElementById("save-cancel");

    editButton.style.visibility = 'visible';
    saveCancel.style.visibility = 'hidden';
    
    const docPage = document.getElementsByClassName("editable-document-page")[0]
    docPage.setAttribute("contenteditable", "false")

    const toolbar = document.getElementsByClassName("mdxeditor-toolbar")[0]
    toolbar.style.display = 'none';

    // console.log(docPage.getMarkdown())
    // /*
    // TODO:
    // convert html back to markdown
    // Post the markdown to the api endpoint that accepts file changes
    // */
  };

  const clickCancel = () => {
    const editButton = document.getElementById("edit-button");
    const saveCancel = document.getElementById("save-cancel");

    editButton.style.visibility = 'visible';
    saveCancel.style.visibility = 'hidden';    
    
    const docPage = document.getElementsByClassName("editable-document-page")[0]
    docPage.setAttribute("contenteditable", "false")

    const toolbar = document.getElementsByClassName("mdxeditor-toolbar")[0]
    toolbar.style.display = 'none';

    // /*
    // TODO:
    // restore markdown to the state it was in before changes were made
    // */
  };

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
          {editor}
        </div>
      </div>
    </div>

  );
};