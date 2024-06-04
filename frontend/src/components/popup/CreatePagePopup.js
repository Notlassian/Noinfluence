import React, { useEffect, useState } from 'react';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, postData } from "../../utils";
import '../css/Popup.css'
import { ErrorPopup } from './ErrorPopup'

export const CreatePagePopup = () => {

  const navigate = useNavigate();

  const { orgName, spaceName } = useParams();
  const { allowed, setAllowed } = useState(false)
  const { loading, setLoading } = useState(null)
  
  const createPage = async (close) => {
    const folder = document.getElementsByClassName("folder-name")[0].value;
    const page = document.getElementsByClassName("page-name")[0].value;

    try {
      const response = await postData(`org/${orgName}/spaces/${spaceName}/pages/${folder}/${page}/add`, { pageContent: `# This is your new page, ${page}!` }, localStorage.getItem("accessToken"));
      const data = await response.json();
      console.log('Add response:', data);
      navigate(`/${orgName}/${spaceName}/${folder}/${page}`);

      close();
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };
  
  useEffect(() => {
    getData(`org/${orgName}/spaces/${spaceName}/permissions`, localStorage.getItem("accessToken"))
      .then(response => response.json())
      .then(permData => {
        console.log("PERM DATA:")
        console.log(permData);
        if (permData.perms.includes("Write")) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [orgName, spaceName]);

  const trigger = <button className='button'> Create Page</button>

  if (!allowed) {
    return <ErrorPopup trigger={trigger}/>
  }
  
  return (
    <Popup
      trigger={trigger}
      position="bottom center"
      closeOnDocumentClick
      modal
      nested>

      {(close) => (
        <div className="menu">

          <div class="org-input">
          <h4> Org Name: </h4>
            <text> {orgName} </text>
          </div>
          <div class="space-input">
            <h4> Space Name: </h4>
            <text> {spaceName} </text>
          </div>

          <div class="folder-input">
            <h4> Folder Name: </h4>
            <input class="folder-name" />
          </div>

          <div class="page-input">
            <h4> Page Name: </h4>
            <input class="page-name" />
          </div>

          <button class="popup-button create-page-button" onClick={() => createPage(close)}>
            Create
          </button>
        </div>
      )}
    </Popup>
  );
};