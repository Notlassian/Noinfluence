import React, { useState } from 'react';
import { Popup } from 'reactjs-popup';
import { postData } from "../../utils";

import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css';

export const AddSpaceUserPopUp = (props) => {

  const [userRole, setUserRole] = useState('Admin');

  const orgName = props.organisationName;
  const spaceName = props.spaceName;

  const addSpaceUser = async () => {
    const inputUserName = document.getElementsByClassName("user-name")[0].value;

    try {
      const response = await postData(`org/${orgName}/spaces/${spaceName}/admin/add`, { user: inputUserName, role: userRole }, localStorage.getItem("accessToken"));
      const data = await response.json();
      console.log('Add response:', data);

    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  }

  const handleRoleChange = (role) => {
    setUserRole(role);
  };

  return (
    <Popup
      trigger={<button className="button"> Add a new user </button>}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested
    >
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
          <select
            defaultValue={'Admin'}
            value={userRole}
            onChange={(e) => handleRoleChange(e.target.value)}>

            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
      </div>

      <button class="add-user-button" onClick={() => addSpaceUser()}>
        Add
      </button>
    </Popup>
  );
};