import { Popup } from 'reactjs-popup';
import { AlertType, HttpStatusCodes, checkStr, postData, showAlert } from "../../utils";

import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css';

export const CreateOrganisationPopUp = ({refresh}) => {

  const addOrg = async (close) => {
    try {
      const inputOrgName = document.getElementsByClassName("org-name")[0].value.trim();

      if (!inputOrgName) {
        showAlert(`The organisation's name cannot be empty.`, AlertType.Info);
        return;
      } else if (!checkStr(inputOrgName, 30)) {
        showAlert(`An organisation's name can be up to 30 characters long must contain only alphanumeric characters or dashes.`, AlertType.Info);
        return;
      }

      const response = await postData(`org/create`, { org: inputOrgName }, localStorage.getItem("accessToken"));

      if (response.ok) {
        showAlert(`Organisation ${inputOrgName} added successfully.`, AlertType.Success);
        refresh();
        close();
      } else if (response.status === HttpStatusCodes.NotAcceptable) {
        showAlert('You can only have up to 10 organisations per account.', AlertType.Info);
      } else {
        showAlert('An error occured while creating an organisation, please contact Noinfluence for support.', AlertType.Error);
      }

    } catch (error) {
      showAlert(`An error occured while creating an organisation, please try again in a moment. If this error continues, please try again in a moment.`, AlertType.Error);
    }
  }

  return (
    <Popup
      trigger={<button className="popup-trigger create-organisation button"> Create a new organisation </button>}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested
    >

    {(close) => (
      <div className="menu">
        <div className="org-input">
          <h4> Organisation Name: </h4>
          <input className="org-name" />
        </div>

        <button className="popup-resolver add-organisation-button" onClick={() => addOrg(close)}>
          Create
        </button>
      </div>
    )}
    </Popup>
  );
};