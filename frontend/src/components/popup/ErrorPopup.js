import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../css/CreateResourcePopup.css'


export const ErrorPopup = (props) => {
  errorOK = () => {
    console.log("click ok")
  }
  
  return (
    <Popup
      trigger={<button className="button"> Create Page </button>}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested
    >
    <div> You are not allowed to perform that action</div>
    <button  onClick={() => errorOK()} > OK </button>
    </Popup>
  );
};