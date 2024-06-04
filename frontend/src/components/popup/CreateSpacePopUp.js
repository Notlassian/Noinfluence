import { Popup } from 'reactjs-popup';
import { AlertType, HttpStatusCodes, postData, showAlert } from "../../utils";
import { useNavigate } from 'react-router-dom';

import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css';

export const CreateSpacePopUp = (props) => {

  const orgName = props.orgName;

  const navigate = useNavigate();

  const addSpace = async () => {
    const inputSpaceName = document.getElementsByClassName("space-name")[0].value;

    try {
      const response = await postData(`org/${orgName}/spaces/add`, { space: inputSpaceName }, localStorage.getItem("accessToken"));

      if (response.ok) {
        const data = await response.json();
        console.log('Add response:', data);
        showAlert(`Space ${inputSpaceName} added successfully.`, AlertType.Success);
      } else if (response.status === HttpStatusCodes.Forbidden) {
        showAlert('You are unable to add spaces to this organisation.', AlertType.Info);
        navigate('/');
      } else {
        showAlert('An error occured while adding a user, please contact Noinfluence support.', AlertType.Error);
      }

    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
      showAlert(`An error occured while trying to make a new space, please try again in a moment. If this error continues, please contact Noinfluence support`, AlertType.Error);
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