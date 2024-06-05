import React from 'react';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { postData } from "../../utils";
import '../css/CreateResourcePopup.css'

export const CreatePagePopup = () => {

  const navigate = useNavigate();

  const { orgName, spaceName } = useParams();

  const createPage = async (close) => {

    const folder = document.getElementsByClassName("folder-name")[0].value;
    const page = document.getElementsByClassName("page-name")[0].value;

    try {
      const response = await postData(`org/${orgName}/spaces/${spaceName}/pages/${folder}/${page}/add`, { pageContent: `# This is your new page, ${page}!` }, localStorage.getItem("accessToken"));
      const data = await response.json();
      console.log('Add response:', data);
      navigate(`/${orgName}/${spaceName}/${folder}/${page}`);

      close();
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Popup
      trigger={<button className="button"> Create Page </button>}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested>

      {(close) => (
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

          <button class="create-page-button" onClick={() => createPage(close)}>
            Create
          </button>
        </div>
      )}
    </Popup>
  );
};