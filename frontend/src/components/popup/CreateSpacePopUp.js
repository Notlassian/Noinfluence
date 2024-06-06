import { Popup } from 'reactjs-popup';
import { AlertType, HttpStatusCodes, checkStr, postData, showAlert } from "../../utils";
import { useNavigate } from 'react-router-dom';

import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css';

export const CreateSpacePopUp = (props) => {

  const orgName = props.orgName;

  const navigate = useNavigate();

  const addSpace = async (close) => {
    try {
      const inputSpaceName = document.getElementById("space-name").value;

      if (!inputSpaceName) {
        showAlert(`The space's name cannot be empty.`, AlertType.Info);
        return;
      } else if (!checkStr(inputSpaceName, 30)) {
        showAlert(`A space's name can be up to 30 characters long must contain only alphanumeric characters or dashes.`, AlertType.Info);
        return;
      }

      const response = await postData(`org/${orgName}/spaces/add`, { space: inputSpaceName }, localStorage.getItem("accessToken"));

      if (response.ok) {
        showAlert(`Space ${inputSpaceName} added successfully.`, AlertType.Success);
        navigate(`/${orgName}/${inputSpaceName}`);

        close();
      } else if (response.status === HttpStatusCodes.Forbidden) {
        showAlert('You are unable to add spaces to this organisation.', AlertType.Info);
        navigate('/');

        close();
      } else if (response.status === HttpStatusCodes.NotAcceptable) {
        showAlert(`An organisation can only have up to 10 spaces.`, AlertType.Info);
        navigate('/');

        close();
      } else {
        showAlert('An error occured while adding a user, please contact Noinfluence support.', AlertType.Error);
      }
    } catch (error) {
      showAlert(`An error occured while trying to make a new space, please try again in a moment. If this error continues, please contact Noinfluence support`, AlertType.Error);
    }
  }

  return (
    <Popup
      trigger={<button className="popup-trigger create-space-user button"> Create a new space </button>}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested>

      {(close) => (
        <div className="menu">

        <div className="org-input">
          <h4> Organisation Name: </h4>
            <span> {orgName} </span>
          </div>

          <div className="space-input">
            <h4> Space Name: </h4>
            <input id="space-name" maxlength="30"/>
          </div>

          <button className="popup-resolver add-space-button" onClick={() => addSpace(close)}>
            Create space
          </button>
        </div>
      )}
    </Popup>
  );
};