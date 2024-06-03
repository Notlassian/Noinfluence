import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import '../css/SpaceSideNavigationBar.css';
import { getData } from "../../utils";

export const SpaceSideNavigationBar = () => {
  const [sideNavBarWindow, setSideNavigationBar] = useState(false);
  const [expandedFolderIndex, setExpandedFolderIndex] = useState(null);
  const [folders, setFolders] = useState([]);

  const navigate = useNavigate();

  const { orgName, spaceName } = useParams();

  console.log(orgName + "/" + spaceName);

  const fetchFolders = async () => {

    try {
      const response = await getData(`org/${orgName}/spaces/${spaceName}/list`, localStorage.getItem("accessToken"));
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
  };

  const showSideNavigationBar = () => {
    setSideNavigationBar(!sideNavBarWindow);
  };

  const toggleFolderExpanded = (folderIndex) => {
    setExpandedFolderIndex(expandedFolderIndex === folderIndex ? null : folderIndex);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <nav className="sideNavBarWindow" style={{ width: sideNavBarWindow === false ? 60 : 250 }}>
      <div className="burger" onClick={showSideNavigationBar}>
        <img src="/menu.png" alt="menu-burger" />
      </div>

      <span
        className="space-setting"
        style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
        onClick={() => navigate(`/${orgName}/${spaceName}/settings`)}>

        {'Space Setting'}
      </span>

      <ul className="navbar-list">

          <li key={`${spaceName}`}>
            <span
              className="navbar-li"
              style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}>

              {spaceName}
            </span>

            {folders.map((folder, folderIndex) => (

              <ul key={`folder-${folderIndex}`} className="sub-list">
                <li
                  className={`sub-item ${expandedFolderIndex === folderIndex ? "expanded" : ""}`}
                  onClick={() => toggleFolderExpanded(folderIndex)}>

                  <span
                    className="navbar-li"
                    style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}>

                    {folder.name}
                  </span>

                  {expandedFolderIndex === folderIndex && (
                    <ul className="sub-sub-list">
                      {folder.items.map((page, pageIndex) => (
                        <li
                          key={`page-${pageIndex}`}
                          className="sub-sub-item"
                          onClick={() => navigate(`/${orgName}/${spaceName}/${folder.name}/${page}`)}>

                          <span
                            className="navbar-li"
                            style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}>

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

      {sideNavBarWindow &&

        <div className="create-button-container">
          <button className="create-button">Create Page</button>
        </div>
      }
    </nav>
  );
};

