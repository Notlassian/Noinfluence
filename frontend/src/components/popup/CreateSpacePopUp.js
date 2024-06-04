import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Popup } from 'reactjs-popup';
import { getData, postData } from "../../utils";

import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css';

export const CreateSpacePopUp = (props) => {

  const orgName = props.orgName;

  const addSpace = async () => {
    const inputSpaceName = document.getElementsByClassName("space-name")[0].value;

    try {
      const response = await postData(`org/${orgName}/spaces/add`, { space: inputSpaceName }, localStorage.getItem("accessToken"));
      const data = await response.json();
      console.log('Add response:', data);

    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <Popup
      trigger={<button className="button"> Create a new space </button>}
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
          <input className="space-name" />
        </div>
      </div>

      <button className="add-space-button" onClick={() => addSpace()}>
        Create space
      </button>
    </Popup>
  );
};

// cosnt myContainer = styled.div`
//   width: 60%;
//   height: 50%;
// `;

// <MyContainer>

// </MyContainer>