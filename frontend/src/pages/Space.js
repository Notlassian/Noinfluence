import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MarkdownDisplay, SpaceSideNavigationBar } from "../components";
import './css/Space.css';
import { getData, putData } from '../utils';

export const Space = () => {

  const [markdown, setMarkdown] = useState(null);
  const [editEnabled, setEditEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { orgName, spaceName } = useParams();

  const fetchPage = React.useCallback(async () => {
    getData(`org/${orgName}/spaces/${spaceName}/homepage/retrieve`)
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
  }, [orgName, spaceName]);

  const updateMarkdown = async (newMarkdown) => {
    putData(`org/${orgName}/spaces/${spaceName}/homepage/update`, { pageContent: newMarkdown}, localStorage.getItem("accessToken"))
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