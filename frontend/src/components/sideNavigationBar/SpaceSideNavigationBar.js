import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreatePagePopup } from '../popup';
import { AlertType, HttpStatusCodes, getData, postDataWithoutBearer, showAlert } from "../../utils";
import '../css/SpaceSideNavigationBar.css';

export const SpaceSideNavigationBar = () => {

  const [expandedFolderIndex, setExpandedFolderIndex] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [folders, setFolders] = useState([]);

  const navigate = useNavigate();

  const { orgName, spaceName } = useParams();

  const fetchIsAdmin = React.useCallback(async () => {

    try {
      const response = await getData(`org/${orgName}/spaces/${spaceName}/admin/check`, localStorage.getItem('accessToken'));
      setIsAdmin(response.ok);
    } catch (error) {}
  }, [orgName, spaceName]);

  const fetchFolders = React.useCallback(async () => {

    try {

      const response = await getData(`org/${orgName}/spaces/${spaceName}/list`, localStorage.getItem('accessToken'));

      if (response.ok) {
        const data = await response.json();

        const formattedData = Object.entries(data).map(([key, value]) => ({
          name: key,
          items: value.map(folder => folder)
        }));

        setFolders(formattedData);
      } else if (response.status === HttpStatusCodes.Unauthorized) {
        if (localStorage.getItem("refreshToken")) {
          postDataWithoutBearer('auth/refresh', { code: localStorage.getItem("refreshToken") })
          .then((response) => {

            response.json().then((body) => {

              if (response.ok) {
                const { access_token, id_token } = body;
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('idToken', id_token);
                window.location.reload();
              } else {
                showAlert(`You are not logged in, please login to continue.`, AlertType.Info);
                navigate("/unauthorized");
              }
            })
          })
          .catch(() => {
            showAlert(`You are not logged in, please login to continue.`, AlertType.Info);
            navigate("/unauthorized");
          });
        }
      } else {
        showAlert(`You are not logged in, please login to continue.`, AlertType.Info);
        navigate("/unauthorized");
      }

    } catch (error) {
      showAlert(`Couldn't retrieve this spaces pages, please try again in a moment. If this error continues, please contact Noinfluence support.`, AlertType.Error);
    }
  }, [orgName, spaceName, navigate]);

  const toggleFolderExpanded = (folderIndex) => {
    setExpandedFolderIndex(expandedFolderIndex === folderIndex ? null : folderIndex);
  };

  useEffect(() => {
    fetchIsAdmin();
    fetchFolders();
  }, [fetchFolders, fetchIsAdmin]);

  return (

    <nav className='sideNavBarWindow'>

      {isAdmin &&

        <div className="space-setting-icon-container" onClick={() => navigate(`/${orgName}/${spaceName}/settings`)}>

          <img className='setting-icon' src='/setting.svg' alt='setting'/>
          <span className="space-setting-text">Space Setting</span>
        </div>
      }

      <ul className='navbar-list'>

          <li key={`${spaceName}`}>
            <span
              className='navbar-li'
              onClick={() => navigate(`/${orgName}/${spaceName}`)}
            >
                

              <img className='space-icon' src='/space.png' alt='space'/>
              {spaceName}
            </span>

            {folders.map((folder, folderIndex) => (

              <ul key={`folder-${folderIndex}`} className='sub-list'>
                <li
                  className={`sub-item ${expandedFolderIndex === folderIndex ? 'expanded' : ''}`}
                  onClick={() => toggleFolderExpanded(folderIndex)}>

                  <span
                    className='navbar-li'>

                    <img className='folder-icon' src='/folder.png' alt='folder'/>

                    {folder.name}

                    {folder.items.length > 0 &&

                      <img className='down-arrow-icon' src='/down-arrow.png' alt='down-arrow'/>
                    }
                  </span>

                  {expandedFolderIndex === folderIndex && (
                    <ul className='sub-sub-list'>
                      {folder.items.map((page, pageIndex) => (
                        <li
                          key={`page-${pageIndex}`}
                          className='sub-sub-item'
                          onClick={() => navigate(`/${orgName}/${spaceName}/${folder.name}/${page}`)}>

                          <span
                            className='navbar-li'>

                            <img className='page-icon' src='/page.png' alt='page'/>
                            {page}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            ))}
          </li>
      </ul>

      {isAdmin ? <div className="create-button-container">
        <CreatePagePopup/>
      </div> : null }
    </nav>
  );
};

