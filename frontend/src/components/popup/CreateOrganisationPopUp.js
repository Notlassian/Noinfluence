import { Popup } from 'reactjs-popup';
import { AlertType, postData, showAlert } from "../../utils";

import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css';

export const CreateOrganisationPopUp = () => {

  const addOrg = async () => {
    const inputOrgName = document.getElementsByClassName("org-name")[0].value;

    try {
      const response = await postData(`org/create`, { org: inputOrgName }, localStorage.getItem("accessToken"));
      const data = await response.json();
      console.log('Add response:', data);
      showAlert(`Organisation ${inputOrgName} added successfully.`, AlertType.Success);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
      showAlert(`An error occured while creating an organisation, please try again in a moment.`, AlertType.Error);
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
        <div className="org-input">
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