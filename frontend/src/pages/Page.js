
import React, { useState, useEffect } from 'react';
import { SpaceSideNavigationBar } from "../components";

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
import { useParams } from 'react-router-dom';
import { getData, putData } from '../utils';


export const Page = () => {

  const { orgName, spaceName, folderName, pageName } = useParams();

  console.log(orgName + "/" + spaceName + "/" + folderName + "/" + pageName);

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
  const [ editState, setEditState] = useState(false);
  const [ editEnabled, setEditEnabled] = useState(false);

  const handleMarkdownChange = (newMarkdown) => {
    setCurrentMarkdown(newMarkdown);
  };

  useEffect(() => {
    getData(`org/${orgName}/spaces/${spaceName}/pages/${folderName}/${pageName}/retrieve`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSavedMarkdown(data.pageContent);
        setCurrentMarkdown(data.pageContent);

        setLoading(false);

        getData(`org/${orgName}/spaces/${spaceName}/permissions`, localStorage.getItem("accessToken"))
          .then(response => response.json())
          .then(permData => {
            console.log("PERM DATA:")
            console.log(permData);
            if (permData.perms.includes("Write")) {
              setEditEnabled(true);
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [folderName, orgName, pageName, spaceName]);

  const page = () => {
    if (readOnly) {
      return <div class="page">
        
      <SpaceSideNavigationBar/>
      
      { editEnabled ? <nav class="document-manager">
        <button id='edit-button' onClick={clickEdit}> edit </button>
      </nav> : null}
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
      return <div class="page">
        
      <SpaceSideNavigationBar/>
      
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
    
    putData(`org/${orgName}/spaces/${spaceName}/pages/${folderName}/${pageName}/update`, { pageContent: currentMarkdown}, localStorage.getItem("accessToken"))
      .catch(error => console.log(error));
  };

  const clickCancel = () => {
    setReadOnly(true)
    setEditState(!editState)
    setCurrentMarkdown(savedMarkdown)
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!savedMarkdown) {
    return <div>No data available</div>;
  }

  else {
    return page(readOnly)
  }
};