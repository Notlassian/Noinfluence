// import React, { useState } from "react";
// import '../css/SpaceSideNavigationBar.css';

// export const SpaceSideNavigationBar = ({ sideNavBarItem }) => {
//   const [sideNavBarWindow, setSideNavigationBar] = useState(false);
//   const [expandedSpaceIndex, setExpandedSpaceIndex] = useState(null);
//   const [expandedFolderIndex, setExpandedFolderIndex] = useState(null);

//   const showSideNavigationBar = () => {
//     setSideNavigationBar(!sideNavBarWindow);
//   };

//   const toggleSpaceExpanded = (index) => {
//     setExpandedSpaceIndex(expandedSpaceIndex === index ? null : index);
//     setExpandedFolderIndex(null);
//   };

//   const toggleFolderExpanded = (index) => {
//     setExpandedFolderIndex(expandedFolderIndex === index ? null : index);
//   };

//       // const createPage = () => {

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
//           pages: ['Page 1.1', 'Page 1.2']
//         },
//         {
//           name: 'Folder 2',
//           pages: ['Page 2.1', 'Page 2.2']
//         }
//       ]
//     },
//     {
//       name: 'Space 2',
//       folders: [
//         {
//           name: 'Folder 3',
//           pages: ['Page 3.1', 'Page 3.2']
//         }
//       ]
//     }
//   ];

//   return (
//     <nav className="sideNavBarWindow" style={{ width: sideNavBarWindow === false ? 60 : 250 }}>
//       <div className="burger" onClick={showSideNavigationBar}>
//         <img src="/menu.png" alt="menu-burger" />
//       </div>

//       <ul className="navbar-list">
//         {spaces.map((space, spaceIndex) => (
//           <div key={`space-${spaceIndex}`}>
//             <div className="navbar-li-box" onClick={() => toggleSpaceExpanded(spaceIndex)}>
//               <img
//                 src={'/dot.png'}
//                 alt={space.name}
//                 style={{ paddingLeft: sideNavBarWindow === false ? 17 : 27 }}
//               />
//               <li
//                 className="navbar-li"
//                 style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
//               >
//                 {space.name}
//               </li>
//             </div>

//             {expandedSpaceIndex === spaceIndex && space.folders.map((folder, folderIndex) => (
//               <div key={`folder-${folderIndex}`} className="navbar-li-box sub-item">
//                 <div onClick={() => toggleFolderExpanded(folderIndex)}>
//                   <img
//                     src={'/dot.png'}
//                     alt={folder.name}
//                     style={{ paddingLeft: sideNavBarWindow === false ? 34 : 44 }}
//                   />
//                   <li
//                     className="navbar-li"
//                     style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
//                   >
//                     {folder.name}
//                   </li>
//                 </div>

//                 {expandedFolderIndex === folderIndex && folder.pages.map((page, pageIndex) => (
//                   <div key={`page-${pageIndex}`} className="navbar-li-box sub-sub-item">
//                     <img
//                       src={'/dot.png'}
//                       alt={page}
//                       style={{ paddingLeft: sideNavBarWindow === false ? 51 : 61 }}
//                     />
//                     <li
//                       className="navbar-li"
//                       style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
//                     >
//                       {page}
//                     </li>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         ))}
//       </ul>

//       {/* <button onClick={createPage()}>Create Page</button> */}
//     </nav>
//   );
// };


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/SpaceSideNavigationBar.css';

export const SpaceSideNavigationBar = ({ sideNavBarItem }) => {
  const [sideNavBarWindow, setSideNavigationBar] = useState(false);
  const [expandedFolderIndex, setExpandedFolderIndex] = useState(null);

  const navigate = useNavigate();

  const showSideNavigationBar = () => {
    setSideNavigationBar(!sideNavBarWindow);
  };

  const toggleFolderExpanded = (folderIndex) => {
    setExpandedFolderIndex(expandedFolderIndex === folderIndex ? null : folderIndex);
  };

  const spaces = [
    {
      name: 'Space 1',
      folders: [
        {
          name: 'Folder 1',
          pages: ['Page 1.1', 'Page 1.2']
        },
        {
          name: 'Folder 2',
          pages: ['Page 2.1', 'Page 2.2']
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
        onClick={() => navigate('/spaceSetting')}
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
                          onClick={() => navigate('/page')}>
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
