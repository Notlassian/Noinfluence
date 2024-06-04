import React from 'react';
import { useParams } from 'react-router-dom';
import { SpaceSideNavigationBar } from '../components';
import './css/Space.css';

export const Space = () => {

  const { orgName, spaceName } = useParams();

  console.log(orgName + '/' + spaceName);

  return (

    <div className='space-container'>

      <SpaceSideNavigationBar/>

      <h1>Welcome to {spaceName}</h1>
    </div>
  );
};