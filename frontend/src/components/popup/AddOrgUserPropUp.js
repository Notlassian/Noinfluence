import React, { useState } from 'react';
import { Popup } from 'reactjs-popup';
import { getData, postData } from "../../utils";

import 'reactjs-popup/dist/index.css';
import '../css/PageCreator.css';

export const AddOrgUserPopUp = (props) => {

  const [userName, setUserName] = useState('');

  const orgName = props.organisationName;

  const addOrgUser = async () => {
    setUserName(document.getElementsByClassName("org-name")[0].value);

    try {
      const response = await postData(`org/${orgName}/admin/add`, { user: userName }, localStorage.getItem("accessToken"));
      const data = await response.json();
      console.log('Add response:', data);

    } catch (error) {
      console.error('Error:', error);
    }
  }

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

        <div className="user-input">
          <h4> User Name: </h4>
          <input class="user-name" />
        </div>
      </div>

      <button class="add-user-button" onClick={() => addOrgUser()}>
        Add
      </button>
    </Popup>
  );
};