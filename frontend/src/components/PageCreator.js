import React from 'react';
import {Popup, } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export const PageCreator = (props) => {
  const createPage = () => {
    const org = props.orgName
    const space = props.spaceName
    
    const folder = document.getElementsByClassName("folder-name")[0].value
    const page = document.getElementsByClassName("page-name")[0].value
    alert(`/createpage/${org}/${space}/${folder}/${page}`)
  }
  var orgName = props.orgName
  var spaceName = props.spaceName
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
        <input class="folder-name"></input>
        <h4> Page Name: </h4>
        <input class="page-name"></input>
        <button class="create-page-button" onClick={() => createPage()}>
            Create
        </button>
      </div>
    </Popup>
  );
}