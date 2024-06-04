import React, { useEffect, useState } from 'react';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/CreateResourcePopup.css'
import './ErrorPopup'

export const CreatePagePopup = (props) => {

  const navigate = useNavigate();

  const { orgName, spaceName } = useParams();
  const { allowed, setAllowed } = useState(false)
  const createPage = () => {

    const folder = document.getElementsByClassName("folder-name")[0].value;
    const page = document.getElementsByClassName("page-name")[0].value;

    console.log(`org/${orgName}/spaces/${spaceName}/pages/${folder}/${page}/retreive`); // TODO: replace with call to API
    // Redirect to the new page
    navigate(`/pages/${orgName}/${spaceName}/${folder}/${page}`);
  };
  
  useEffect(() => {
    getData(`org/${orgName}/spaces/${spaceName}/permissions`, localStorage.getItem("accessToken"))
      .then(response => response.json())
      .then(permData => {
        console.log("PERM DATA:")
        console.log(permData);
        if (permData.perms.includes("Write")) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [folderName, orgName, pageName, spaceName]);

  if (!allowed) {
    return <ErrorPopup/>
  }
  
  return (
    <Popup
      trigger={<button className="button"> Create Page </button>}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested
    >
      <div className="menu">

        <div class="org-input">
         <h4> Org Name: </h4>
          <text> {orgName} </text>
        </div>
        <div class="space-input">
          <h4> Space Name: </h4>
          <text> {spaceName} </text>
        </div>

        <div class="folder-input">
          <h4> Folder Name: </h4>
          <input class="folder-name" />
        </div>

        <div class="page-input">
          <h4> Page Name: </h4>
          <input class="page-name" />
        </div>
      </div>
      <button class="create-page-button" onClick={() => createPage()}>
          Create
      </button>
    </Popup>
  );
};