import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { Page, SpaceSetting } from './';
import { SpaceDashboard, SpaceSideNavigationBar } from "../components";
import './css/Space.css';

export const Space = () => {
  const sideNavBarItem = [
    ['page1','./dot.png'],
    ['page2','./dot.png'],
  ];

  // const pageExist =

  return (
    <div className="space-container">

      <SpaceSideNavigationBar
        sideNavBarItem={sideNavBarItem}/>

      {/* {pageExist &&

        <Page page={pageContent}/>
      } */}
      {/* <h2>You do not have any page in this space</h2> */}

      <Routes>
        <Route path="/:folderName/:pageName" element={<Page />} />
        <Route path="spaceSettings" element={<SpaceSetting />} />
      </Routes>
    </div>

  );
};