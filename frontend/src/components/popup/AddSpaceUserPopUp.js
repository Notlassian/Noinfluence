import React, { useState } from 'react';
import { Popup } from 'reactjs-popup';
<<<<<<< HEAD
import { postData } from '../../utils';

import 'reactjs-popup/dist/index.css';
import '../css/PageCreator.css';
=======
import { postData } from "../../utils";

import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css';
>>>>>>> 8b4e2d521acfecc6b6825e6d249c7b7f2a7a18ac

export const AddSpaceUserPopUp = (props) => {

  const [userRole, setUserRole] = useState('Admin');

  const orgName = props.organisationName;
  const spaceName = props.spaceName;

  const addSpaceUser = async () => {
<<<<<<< HEAD

    const inputUserName = document.getElementsByClassName('user-name')[0].value;

    try {
      const response = await postData(`org/${orgName}/spaces/${spaceName}/admin/add`, { user: inputUserName, role: userRole }, localStorage.getItem('accessToken'));
=======
    const inputUserName = document.getElementsByClassName("user-name")[0].value;

    try {
      const response = await postData(`org/${orgName}/spaces/${spaceName}/admin/add`, { user: inputUserName, role: userRole }, localStorage.getItem("accessToken"));
>>>>>>> 8b4e2d521acfecc6b6825e6d249c7b7f2a7a18ac
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
<<<<<<< HEAD

    <Popup
      trigger={<button className='button'> Add a new user </button>}
      position='bottom center'
      closeOnDocumentClick
      modal
      nested>

      <div className='menu'>

        <div className='org-input'>
=======
    <Popup
      trigger={<button className="button"> Add a new user </button>}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested
    >
      <div className="menu">

        <div className="org-input">
>>>>>>> 8b4e2d521acfecc6b6825e6d249c7b7f2a7a18ac
         <h4> Organisation Name: </h4>
          <span> {orgName} </span>
        </div>

<<<<<<< HEAD
        <div className='space-input'>
=======
        <div className="space-input">
>>>>>>> 8b4e2d521acfecc6b6825e6d249c7b7f2a7a18ac
          <h4> Space Name: </h4>
          <span> {spaceName} </span>
        </div>

<<<<<<< HEAD
        <div className='user-input'>
          <h4> User Name: </h4>
          <input class='user-name' />
        </div>

        <div className='page-input'>
=======
        <div className="user-input">
          <h4> User Name: </h4>
          <input class="user-name" />
        </div>

        <div className="page-input">
>>>>>>> 8b4e2d521acfecc6b6825e6d249c7b7f2a7a18ac
          <select
            defaultValue={'Admin'}
            value={userRole}
            onChange={(e) => handleRoleChange(e.target.value)}>

<<<<<<< HEAD
            <option value='Admin'>Admin</option>
            <option value='Editor'>Editor</option>
            <option value='Viewer'>Viewer</option>
=======
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
>>>>>>> 8b4e2d521acfecc6b6825e6d249c7b7f2a7a18ac
          </select>
        </div>
      </div>

<<<<<<< HEAD
      <button class='add-user-button' onClick={() => addSpaceUser()}>
=======
      <button class="add-user-button" onClick={() => addSpaceUser()}>
>>>>>>> 8b4e2d521acfecc6b6825e6d249c7b7f2a7a18ac
        Add
      </button>
    </Popup>
  );
};