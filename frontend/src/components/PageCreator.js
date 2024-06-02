import React from 'react';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';

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
    >
      <div className="menu">
        <h4> Org Name: </h4>
        <text> {orgName} </text>
        <h4> Space Name: </h4>
        <text> {spaceName} </text>
        <h4> Folder Name: </h4>
        <input className="folder-name" />
        <h4> Page Name: </h4>
        <input className="page-name" />
        <button className="create-page-button" onClick={() => createPage()}>
          Create
        </button>
      </div>
    </Popup>
  );
};