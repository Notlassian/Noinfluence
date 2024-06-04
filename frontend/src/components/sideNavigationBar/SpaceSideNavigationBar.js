import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreatePagePopup } from '../popup';
import { getData } from "../../utils";
import '../css/SpaceSideNavigationBar.css';

export const SpaceSideNavigationBar = () => {

  const [expandedFolderIndex, setExpandedFolderIndex] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [folders, setFolders] = useState([]);

  const navigate = useNavigate();

  const { orgName, spaceName } = useParams();

  console.log(orgName + '/' + spaceName);

  const fetchIsAdmin = React.useCallback(async () => {

    try {

      const response = await getData(`org/${orgName}/spaces/${spaceName}/admin/check`, localStorage.getItem('accessToken'));
      setIsAdmin(response.ok);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [orgName, spaceName]);

  const fetchFolders = React.useCallback(async () => {

    try {

      const response = await getData(`org/${orgName}/spaces/${spaceName}/list`, localStorage.getItem('accessToken'));
      const data = await response.json();
      console.log(data);

      const formattedData = Object.entries(data).map(([key, value]) => ({
        name: key,
        items: value.map(folder => folder)
      }));

      console.log(formattedData);

      setFolders(formattedData);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [orgName, spaceName]);

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

        <div className="space-setting-container" onClick={() => navigate(`/${orgName}/${spaceName}/settings`)}>
          {'Space Setting'}
        </div>
      }

      <ul className='navbar-list'>

          <li key={`${spaceName}`}>
            <span
              className='navbar-li'>

              {spaceName}
            </span>

            {folders.map((folder, folderIndex) => (

              <ul key={`folder-${folderIndex}`} className='sub-list'>
                <li
                  className={`sub-item ${expandedFolderIndex === folderIndex ? 'expanded' : ''}`}
                  onClick={() => toggleFolderExpanded(folderIndex)}>

                  <img src='/folder.svg' alt='menu-burger'/>

                  <span
                    className='navbar-li'>

                    {folder.name}
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

