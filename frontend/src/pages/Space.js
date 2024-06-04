import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MarkdownDisplay, SpaceSideNavigationBar } from "../components";
import './css/Space.css';
import { AlertType, HttpStatusCodes, getData, putData, showAlert } from '../utils';

export const Space = () => {

  const [markdown, setMarkdown] = useState(null);
  const [editEnabled, setEditEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { orgName, spaceName } = useParams();

  const navigate = useNavigate();

  const fetchPage = React.useCallback(async () => {
    getData(`org/${orgName}/spaces/${spaceName}/homepage/retrieve`, localStorage.getItem('accessToken'))
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
      }
    })
    .catch(() => {
      showAlert(`Page you are trying to retrieve doesn't exist.`, AlertType.Info);
      setIsLoading(false);
    });
  }, [orgName, spaceName, navigate]);

  const updateMarkdown = async (newMarkdown) => {
    putData(`org/${orgName}/spaces/${spaceName}/homepage/update`, { pageContent: newMarkdown}, localStorage.getItem("accessToken"))
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