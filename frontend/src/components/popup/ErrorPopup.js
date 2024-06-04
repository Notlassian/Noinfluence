import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../css/Popup.css'
import { useRef } from 'react';

export const ErrorPopup = (props) => {
  const ref = useRef()

  const handleClick = () => {
    console.log("click")
    ref.current.close();
  }
  return (
    <Popup
      ref={ref}
      trigger={props.trigger}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested
    >
    <div> You are not allowed to perform that action. Please contact your administrator to request access</div>
    <button class='popup-button error-button' onClick={() => handleClick()} > OK </button>
    </Popup>
  );
};