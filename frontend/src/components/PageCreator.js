import React from 'react';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import './css/PageCreator.css'
export const PageCreator = (props) => {
  const navigate = useNavigate();

  const createPage = () => {
    const org = props.orgName;
    const space = props.spaceName;

    const folder = document.getElementsByClassName("folder-name")[0].value;
    const page = document.getElementsByClassName("page-name")[0].value;


    console.log(`org/${org}/spaces/${space}/pages/${folder}/${page}/retreive`); // TODO: replace with call to API
    // Redirect to the new page
    navigate(`/pages/${org}/${space}/${folder}/${page}`);
  };

  var orgName = props.orgName;
  var spaceName = props.spaceName;

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