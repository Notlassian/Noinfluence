import React from 'react';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertType, HttpStatusCodes, checkStr, postData, showAlert } from "../../utils";
import '../css/CreateResourcePopup.css'

export const CreatePagePopup = () => {

  const navigate = useNavigate();

  const { orgName, spaceName } = useParams();

  const createPage = async (close) => {

    try {

      const folder = document.getElementsByClassName("folder-name")[0].value.trim();
      const page = document.getElementsByClassName("page-name")[0].value.trim();

      if (!folder || !page) {
        showAlert('The folder and page names cannot be empty.', AlertType.Info);
        return;
      } else if (!checkStr(folder, 30) || !checkStr(page, 30)) {
        showAlert(`Folder and page names can be up to 30 characters long must contain only alphanumeric characters or dashes.`, AlertType.Info);
        return;
      }

      const response = await postData(`org/${orgName}/spaces/${spaceName}/pages/${folder}/${page}/add`, { pageContent: `# This is your new page, ${page}!` }, localStorage.getItem("accessToken"));
      if (response.ok) {
        navigate(`/${orgName}/${spaceName}/${folder}/${page}`);
        close();
      } else if (response.status === HttpStatusCodes.Forbidden) {
        showAlert(`You don't have access to this space.`, AlertType.Info);
        navigate('/');

        close();
      } else if (response.status === HttpStatusCodes.NotAcceptable) {
        showAlert(`A space can only have up to 30 pages.`, AlertType.Info);
        navigate('/');

        close();
      } else {
        showAlert('An error occured while creating this page, please contact Noinfluence support.', AlertType.Error);
      }
    } catch (error) {
      showAlert('An error occured while creating this page, please try again in a moment. If this error continues, please contact Noinfluence support.', AlertType.Error);
    }
  };

  return (
    <Popup
      trigger={<button className="popup-trigger create-page button"> Create Page </button>}
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

          <button class="popup-resolver create-page-button" onClick={() => createPage(close)}>
            Create
          </button>
        </div>
      )}
    </Popup>
  );
};