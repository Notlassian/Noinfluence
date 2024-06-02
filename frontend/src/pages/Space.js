import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { Page, SpaceSetting } from './';
import { SpaceDashboard, SpaceSideNavigationBar } from "../components";
import './css/Space.css';

export const Space = () => {

  const { spaceName } = useParams();


  // const description = 'This space is to demostrate';
  // const openIssues = ['Issue 1', 'Issue 2', 'Issue 3'];
  // const openIssuesNum = 4;
  // const completedIssuesNum = 7;

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
      <h2>You do not have any page in this space</h2>

      <div className="space-content">
        <h1>Space: {spaceName}</h1>
        <Routes>
          <Route path="page/:pageName" element={<Page />} />
          <Route path="settings" element={<SpaceSetting />} />
        </Routes>
      </div>

      {/* <SpaceDashboard
        description={description}
        openIssues={openIssues}
        openIssuesNum={openIssuesNum}
        completedIssuesNum={completedIssuesNum} /> */}
    </div>

  );
};