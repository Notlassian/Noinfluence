import React, { useState } from 'react';
import { Popup } from 'reactjs-popup';
import { AlertType, HttpStatusCodes, postData, showAlert } from "../../utils";

import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css';
import { useNavigate } from 'react-router-dom';

export const AddSpaceUserPopUp = (props) => {

  const [userRole, setUserRole] = useState('Viewer');
  const navigate = useNavigate();

  const orgName = props.orgName;
  const spaceName = props.spaceName;
  const refresh = props.refresh;

  const addSpaceUser = async (close) => {
    try {

      const inputUserName = document.getElementsByClassName("user-name")[0].value.trim();

      if (!inputUserName) {
        showAlert(`The user's username cannot be empty.`, AlertType.Info);
        return;
      } else if (inputUserName < 128) {
        showAlert(`The username you entered doesn't exist.`, AlertType.Info);
        return;
      }

      const response = await postData(`org/${orgName}/spaces/${spaceName}/admin/add`, { username: inputUserName, role: userRole }, localStorage.getItem("accessToken"));

      if (response.ok) {
        showAlert(`User successfully added user as ${userRole === "Administrator" ? `an ${userRole}` : `a ${userRole}`}.`, AlertType.Success);
        refresh();
        close();
      } else if (response.status === HttpStatusCodes.Forbidden) {
        showAlert('You are unable to access this spaces settings.', AlertType.Info);
        navigate(`/${orgName}/${spaceName}`);
        close();
      } else if (response.status === HttpStatusCodes.NotAcceptable) {
        showAlert('A space can only have up to 25 users.', AlertType.Info);
        close();
      } else if (response.status === HttpStatusCodes.BadRequest) {
        showAlert(`This username doesn't exist or already has access to this space.`, AlertType.Info);
      }else {
        showAlert('An error occured while adding a user, please contact Noinfluence for support.', AlertType.Error);
      }
    } catch (error) {
      showAlert(`An error occured while adding a user, please try again in a moment. If this error continues, please contact Noinfluence support.`, AlertType.Error);
    }
  }

  const handleRoleChange = (role) => {
    setUserRole(role);
  };

  return (
    <Popup
      trigger={<button className="popup-trigger add-space-user button"> Add a new user </button>}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested>

      {(close) => (
        <div className="menu">

          <div className="org-input">
          <h4> Organisation Name: </h4>
            <span> {orgName} </span>
          </div>

          <div className="space-input">
            <h4> Space Name: </h4>
            <span> {spaceName} </span>
          </div>

          <div className="user-input">
            <h4> User Name: </h4>
            <input class="user-name" />
          </div>

          <div className="page-input">
            <h4> User's Role: </h4>
            <select
              value={userRole}
              onChange={(e) => handleRoleChange(e.target.value)}>

              <option value="Administrator">Administrator</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          <button class="popup-resolver add-user-button" onClick={() => addSpaceUser(close)}>
            Add
          </button>
        </div>
      )}
    </Popup>
  );
};