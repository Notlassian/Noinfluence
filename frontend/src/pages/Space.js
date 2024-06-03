import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page, SpaceSetting } from './';
import { SpaceSideNavigationBar } from "../components";
import './css/Space.css';

export const Space = () => {

  const organisationName = localStorage.getItem('organisationName');
  const spaceName = localStorage.getItem('spaceName');

  return (
    <div className="space-container">

      <SpaceSideNavigationBar/>

      {/* {location.pathname === `/${organisationName}/${spaceName}` && (
        <h2>Welcome to the "{spaceName}" Space!</h2>
      )} */}

      <Routes>
        <Route path="/:folderName/:pageName" element={<Page />} />
        <Route path="/spaceSettings" element={<SpaceSetting />} />
      </Routes>
    </div>
  );
};