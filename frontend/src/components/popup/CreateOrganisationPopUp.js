import { Popup } from 'reactjs-popup';
import { postData } from "../../utils";

import 'reactjs-popup/dist/index.css';
import '../css/Popup.css';

export const CreateOrganisationPopUp = () => {

  const addOrg = async (close) => {
    const inputOrgName = document.getElementsByClassName("org-name")[0].value;

    try {
      const response = await postData(`org/create`, { org: inputOrgName }, localStorage.getItem("accessToken"));
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
      trigger={<button className="button"> Create a new organisation </button>}
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

        <button class="popup-button add-organisation-button" onClick={() => addOrg(close)}>
          Create
        </button>
      </div>
    )}
    </Popup>
  );
};