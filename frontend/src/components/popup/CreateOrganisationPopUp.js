import React, { useState } from 'react';
import { Popup } from 'reactjs-popup';
import { getData, postData } from "../../utils";

import 'reactjs-popup/dist/index.css';
import '../css/PageCreator.css';

export const CreateOrganisationPopUp = () => {

  const addOrg = async () => {
    const inputOrgName = document.getElementsByClassName("org-name")[0].value;

    try {
      const response = await postData(`org/create`, { org: inputOrgName }, localStorage.getItem("accessToken"));
      const data = await response.json();
      console.log('Add response:', data);

    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <Popup
      trigger={<button className="button"> Create a new organisation </button>}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested
    >
      <div className="menu">

        <div className="user-input">
          <h4> Organisation Name: </h4>
          <input className="org-name" />
        </div>
      </div>

      <button className="add-organisation-button" onClick={() => addOrg()}>
        Create
      </button>
    </Popup>
  );
};