import React from 'react';
import { Popup } from 'reactjs-popup';
import { AlertType, HttpStatusCodes, checkStr, postData, showAlert } from '../../utils';

import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css';
import { useNavigate } from 'react-router-dom';

export const AddOrgUserPopUp = (props) => {

  const orgName = props.orgName;

  const navigate = useNavigate();

  const addOrgUser = async (close) => {

    try {
      const inputUserName = document.getElementsByClassName('user-name')[0].value.trim();
      
      if (!inputUserName) {
        showAlert(`The user's username cannot be empty.`, AlertType.Info);
        return;
      } else if (inputUserName < 128) {
        showAlert(`The username you entered doesn't exist.`, AlertType.Info);
        return;
      }

      const response = await postData(`org/${orgName}/admin/add`, { user: inputUserName }, localStorage.getItem('accessToken'));

      if (response.ok) {
        const data = await response.json();
        console.log('Add response:', data);
        showAlert('Admin user added successfully.', AlertType.Success);

        close();
      } else if (response.status === HttpStatusCodes.Forbidden) {
        showAlert('You are unable to access this organisations settings.', AlertType.Info);
        navigate('/');

        close();
      } else if (response.status === HttpStatusCodes.NotAcceptable) {
        showAlert('An organisation can only have up to 10 administrators.', AlertType.Info);
        close();
      } else if (response.status === HttpStatusCodes.BadRequest) {
        showAlert(`This username doesn't exist or already has is an admin of this organisation.`, AlertType.Info);
      }else {
        showAlert('An error occured while adding a user, please contact Noinfluence support.', AlertType.Error);
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('An error occured while adding user, please try again in a moment. If this error continues, please contact Noinfluence support', AlertType.Error);
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

          <button class='add-user-button' onClick={() => addOrgUser(close)}>
            Add
          </button>
        </div>
      )}
    </Popup>
  );
};