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
      } else {
        showAlert(`Unable to load this page, please contact Noinfluence support`, AlertType.Error);
      }
      
      setIsLoading(false);
    })
    .catch(() => {
      showAlert(`Unable to load this page, please try again in a moment. If this error continues, please contact Noinfluence support.`, AlertType.Error);
      setIsLoading(false);
    });
  }, [orgName, spaceName, navigate]);

  const updateMarkdown = async (newMarkdown) => {
    putData(`org/${orgName}/spaces/${spaceName}/homepage/update`, { pageContent: newMarkdown}, localStorage.getItem("accessToken"))
    .then(response => {
      if (!response.ok) {
        showAlert('Unable to update this page, please contact Noinfluence for support.');
      }
    })
    .catch(error => {
      console.log(error);
      showAlert('Unable to update this page, please try again in a moment. If this issue continues, please contact Noinfluence for support.');
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