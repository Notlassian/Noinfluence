
import React, { useState, useEffect } from 'react';
import { MarkdownDisplay, SpaceSideNavigationBar } from "../components";

import '../components/css/Document.css';

import '@mdxeditor/editor/style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertType, HttpStatusCodes, getData, putData, showAlert } from '../utils';


export const Page = () => {

  const [markdown, setMarkdown] = useState(null);
  const [editEnabled, setEditEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { orgName, spaceName, folderName, pageName } = useParams();

  const navigate = useNavigate();

  const fetchPage = React.useCallback(async () => {
    getData(`org/${orgName}/spaces/${spaceName}/pages/${folderName}/${pageName}/retrieve`, localStorage.getItem('accessToken'))
      .then(async (response) => {

        if (response.ok) {
          const data = await response.json();
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
            .catch(() => {
              setIsLoading(false);
            });
        } else if (response.status === HttpStatusCodes.Forbidden) {
          showAlert(`You are unable to view this space.`, AlertType.Info);
          navigate('/');
        } else if (response.status === HttpStatusCodes.BadRequest) {
          showAlert(`The page you are looking for doesn't exist.`, AlertType.Info);
          navigate(`/${orgName}/${spaceName}`);
        } else {
          showAlert(`An error occured while loading this page, please contact Noinfluence for support.`, AlertType.Error);
        }

        setIsLoading(false);
      })
      .catch(() => {
        showAlert(`Page you are trying to retrieve doesn't exist.`, AlertType.Info);
        setIsLoading(false);
        navigate(`/${orgName}/${spaceName}`);
      });
  }, [orgName, spaceName, folderName, pageName, navigate]);

  const updateMarkdown = async (newMarkdown) => {
    putData(`org/${orgName}/spaces/${spaceName}/pages/${folderName}/${pageName}/update`, { pageContent: newMarkdown}, localStorage.getItem("accessToken"))
      .catch(error => {
        console.log(error);
        showAlert('Unable to update markdown, please try again in a moment.');
      });
  };

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  return <div class="page-container">
    <SpaceSideNavigationBar/>

    <MarkdownDisplay markdown={markdown} loading={isLoading} editEnabled={editEnabled} onSave={updateMarkdown} />
  </div>
};