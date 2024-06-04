import React from 'react';
import { Popup } from 'reactjs-popup';
import { AlertType, HttpStatusCodes, postData, showAlert } from '../../utils';

import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css';
import { useNavigate } from 'react-router-dom';

export const AddOrgUserPopUp = (props) => {

  const orgName = props.organisationName;

  const navigate = useNavigate();

  const addOrgUser = async () => {

    const inputUserName = document.getElementsByClassName('user-name')[0].value;

    try {
      const response = await postData(`org/${orgName}/admin/add`, { user: inputUserName }, localStorage.getItem('accessToken'));

      if (response.ok) {
        const data = await response.json();
        console.log('Add response:', data);
        showAlert('Admin user added successfully.', AlertType.Success);
      } else if (response.status === HttpStatusCodes.Forbidden) {
        showAlert('You are unable to access this organisations settings.', AlertType.Info);
        navigate('/');
      } else {
        showAlert('An error occured while adding a user, please contact Noinfluence for support.', AlertType.Error);
      }

    } catch (error) {
      console.error('Error:', error);
      showAlert('An error occured while adding user, please try again in a moment.', AlertType.Error);
    }
  }

  return (

    <Popup
      trigger={<button className='button'> Add a new user </button>}
      position='bottom center'
      closeOnDocumentClick
      modal
      nested>

      <div className='menu'>

        <div className='org-input'>
         <h4> Organisation Name: </h4>
          <span> {orgName} </span>
        </div>

        <div className='user-input'>
          <h4> User Name: </h4>
          <input class='user-name' />
        </div>
      </div>

      <button class='add-user-button' onClick={() => addOrgUser()}>
        Add
      </button>
    </Popup>
  );
};