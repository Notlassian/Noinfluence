// import React, { useState } from "react";
// import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
// import { Page, SpaceSetting } from "../../pages";
// import '../css/SpaceSideNavigationBar.css';

// export const SpaceSideNavigationBar = ({ sideNavBarItem }) => {
//   const [sideNavBarWindow, setSideNavigationBar] = useState(false);
//   const [expandedFolderIndex, setExpandedFolderIndex] = useState(null);

//   const navigate = useNavigate();
//   const { spaceName } = useParams();

//   const showSideNavigationBar = () => {
//     setSideNavigationBar(!sideNavBarWindow);
//   };

//   const toggleFolderExpanded = (folderIndex) => {
//     setExpandedFolderIndex(expandedFolderIndex === folderIndex ? null : folderIndex);
//   };

//   // const createPage = () => {

//   //   const requestOptions = {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({ title: 'React POST Request Example' })
//   //   };

//   //   fetch('https://reqres.in/api/posts', requestOptions)
//   //       .then(response => response.json())
//   //       .then(data => this.setState({ postId: data.id }));
//   // };

//   const spaces = [
//     {
//       name: 'Space 1',
//       folders: [
//         {
//           name: 'Folder 1',
//           pages: ['Page1', 'Page2']
//         },
//         {
//           name: 'Folder 2',
//           pages: ['Page1', 'Page2']
//         }
//       ]
//     }
//   ];

//   return (
//     <nav className="sideNavBarWindow" style={{ width: sideNavBarWindow === false ? 60 : 250 }}>
//       <div className="burger" onClick={showSideNavigationBar}>
//         <img src="/menu.png" alt="menu-burger" />
//       </div>

//       <span
//         className="space-setting"
//         style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
//         onClick={() => navigate(`/${spaceName}/spaceSettings`)}
//       >
//         {'Space Setting'}
//       </span>

//       <ul className="navbar-list">
//         {spaces.map((space, spaceIndex) => (
//           <li key={`space-${spaceIndex}`}>
//             <span
//               className="navbar-li"
//               style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
//             >
//               {space.name}
//             </span>

//             {space.folders.map((folder, folderIndex) => (
//               <ul key={`folder-${folderIndex}`} className="sub-list">
//                 <li
//                   className={`sub-item ${expandedFolderIndex === folderIndex ? "expanded" : ""}`}
//                   onClick={() => toggleFolderExpanded(folderIndex)}
//                 >
//                   <span
//                     className="navbar-li"
//                     style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
//                   >
//                     {folder.name}
//                   </span>

//                   {expandedFolderIndex === folderIndex && (
//                     <ul className="sub-sub-list">
//                       {folder.pages.map((page, pageIndex) => (
//                         <li
//                           key={`page-${pageIndex}`}
//                           className="sub-sub-item"
//                           onClick={() => () => navigate(`/${spaceName}/page/${page}`)}>
//                           <span
//                             className="navbar-li"
//                             style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
//                           >
//                             {page}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               </ul>
//             ))}
//           </li>
//         ))}
//       </ul>

//       {sideNavBarWindow &&

//         <div className="create-button-container">
//           <button className="create-button">Create Page</button>
//         </div>
//       }
//     </nav>
//   );
// };



import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import '../css/SpaceSideNavigationBar.css';

export const SpaceSideNavigationBar = ({ sideNavBarItem }) => {
  const [sideNavBarWindow, setSideNavigationBar] = useState(false);
  const [expandedFolderIndex, setExpandedFolderIndex] = useState(null);

  const navigate = useNavigate();
  const { spaceName } = useParams();

  const showSideNavigationBar = () => {
    setSideNavigationBar(!sideNavBarWindow);
  };

  const toggleFolderExpanded = (folderIndex) => {
    setExpandedFolderIndex(expandedFolderIndex === folderIndex ? null : folderIndex);
  };

  const spaces = [
    {
      name: 'Space1',
      folders: [
        {
          name: 'Folder1',
          pages: ['Page1', 'Page2']
        },
        {
          name: 'Folder2',
          pages: ['Page1', 'Page2']
        }
      ]
    }
  ];

  return (
    <nav className="sideNavBarWindow" style={{ width: sideNavBarWindow === false ? 60 : 250 }}>
      <div className="burger" onClick={showSideNavigationBar}>
        <img src="/menu.png" alt="menu-burger" />
      </div>

      <span
        className="space-setting"
        style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
        onClick={() => navigate(`/${spaceName}/settings`)}
      >
        {'Space Setting'}
      </span>

      <ul className="navbar-list">
        {spaces.map((space, spaceIndex) => (
          <li key={`space-${spaceIndex}`}>
            <span
              className="navbar-li"
              style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
            >
              {space.name}
            </span>

            {space.folders.map((folder, folderIndex) => (
              <ul key={`folder-${folderIndex}`} className="sub-list">
                <li
                  className={`sub-item ${expandedFolderIndex === folderIndex ? "expanded" : ""}`}
                  onClick={() => toggleFolderExpanded(folderIndex)}
                >
                  <span
                    className="navbar-li"
                    style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
                  >
                    {folder.name}
                  </span>

                  {expandedFolderIndex === folderIndex && (
                    <ul className="sub-sub-list">
                      {folder.pages.map((page, pageIndex) => (
                        <li
                          key={`page-${pageIndex}`}
                          className="sub-sub-item"
                          onClick={() => navigate(`/${spaceName}/page/${page}`)}
                        >
                          <span
                            className="navbar-li"
                            style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
                          >
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
        ))}
      </ul>

      {sideNavBarWindow &&

        <div className="create-button-container">
          <button className="create-button">Create Page</button>
        </div>
      }
    </nav>
  );
};

