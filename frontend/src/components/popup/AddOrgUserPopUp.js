import React from 'react';
import { Popup } from 'reactjs-popup';
import { postData } from '../../utils';

import 'reactjs-popup/dist/index.css';
import '../css/Popup.css';

export const AddOrgUserPopUp = (props) => {

  const orgName = props.orgName;

  const addOrgUser = async (close) => {

    const inputUserName = document.getElementsByClassName('user-name')[0].value;

    try {
      const response = await postData(`org/${orgName}/admin/add`, { username: inputUserName }, localStorage.getItem('accessToken'));
      const data = await response.json();
      console.log('Add response:', data);

      close();
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  }

  return (

    <Popup
      trigger={<button className='button'> Add a new user </button>}
      position='bottom center'
      closeOnDocumentClick
      modal
      nested>

      {(close) => (
        <div className='menu'>

          <div className='org-input'>
          <h4> Organisation Name: </h4>
            <span> {orgName} </span>
          </div>

          <div className='user-input'>
            <h4> User Name: </h4>
            <input class='user-name' />
          </div>

          <button class='popup-button add-user-button' onClick={() => addOrgUser(close)}>
            Add
          </button>
        </div>
      )}
    </Popup>
  );
};