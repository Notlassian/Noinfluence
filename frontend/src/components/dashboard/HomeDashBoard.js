import React from 'react';
import 'chart.js/auto';
import '../css/HomeDashBoard.css';

export const HomeDashboard = ({ updatedSpaces, updatedFolders, updatedPages }) => {

  return (

    <div className='dashboard-container'>

      <h2>DashBoard</h2>

      <div className='card'>

        <h5>Recent Updated Spaces</h5>
        <ul>

          {updatedSpaces.map((space, index) => (
            <li key={index}>{space}</li>
          ))}
        </ul>
      </div>

      <div className='card'>

        <h5>Recent Updated Folders</h5>
        <ul>

          {updatedFolders.map((folder, index) => (
            <li key={index}>{folder}</li>
          ))}
        </ul>
      </div>

      <div className='card'>

        <h5>Recent Updated Pages</h5>
        <ul>

          {updatedPages.map((page, index) => (
            <li key={index}>{page}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};