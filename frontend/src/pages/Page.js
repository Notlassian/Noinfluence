
import React, { useState, useEffect } from 'react';
import { MarkdownDisplay, SpaceSideNavigationBar } from "../components";

import '../components/css/Document.css';

import '@mdxeditor/editor/style.css';
import { useParams } from 'react-router-dom';
import { getData, putData } from '../utils';


export const Page = () => {

  const [markdown, setMarkdown] = useState(null);
  const [editEnabled, setEditEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { orgName, spaceName, folderName, pageName } = useParams();

  const fetchPage = React.useCallback(async () => {
    getData(`org/${orgName}/spaces/${spaceName}/pages/${folderName}/${pageName}/retrieve`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMarkdown(data.pageContent);
        setIsLoading(false);

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
            setIsLoading(false);
          });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [orgName, spaceName, folderName, pageName]);

  const updateMarkdown = async (newMarkdown) => {
    putData(`org/${orgName}/spaces/${spaceName}/pages/${folderName}/${pageName}/update`, { pageContent: newMarkdown}, localStorage.getItem("accessToken"))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  return <div class="page-container">
    <SpaceSideNavigationBar/>

    <MarkdownDisplay markdown={markdown} loading={isLoading} editEnabled={editEnabled} onSave={updateMarkdown} />  
  </div>
};