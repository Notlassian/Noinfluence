import React from 'react';
import 'chart.js/auto';
import '../css/HomeDashBoard.css';

export const HomeDashboard = ({ recentUpdates }) => {

  const formattedData = Object.entries(recentUpdates).map(([key, value]) => ({
    name: key,
    updates: value
  }));

  const renderUpdateCard = (orgName, spaceName, folderName, pageName) => {
    const spaceLink = `/${orgName}/${spaceName}`;
    const pageLink = `${spaceLink}/${folderName}/${pageName}`;

    switch (Math.floor(Math.random() * 3)) {
      case 0:
        return <div className='update-card'>
          <h3>A fresh new page has been added to <a href={spaceLink}>{spaceName}</a> at <a href={pageLink}>{folderName}/{pageName}</a></h3>
        </div>;
      case 1:
        return <div className='update-card'>
        <h3><a href={pageLink}>{folderName}/{pageName}</a> in <a href={spaceLink}>{spaceName}</a> is now available to view</h3>
      </div>;
      case 2:
        return <div className='update-card'>
        <h3><a href={spaceLink}>{spaceName}</a> has unveiled a new page at <a href={pageLink}>{folderName}/{pageName}</a></h3>
      </div>;
      default:
        return <div className='update-card'>
        <h3>A fresh new page has been added to <a href={spaceLink}>{spaceName}</a> at <a href={pageLink}>{folderName}/{pageName}</a></h3>
      </div>;
    }
  };

  return (

    <div className='dashboard-container'>

      <h1>Recent Updates</h1>

      { formattedData.map((org) => (
        <div key={org.name} className='org-card'>
          <h2>Updates from {org.name}</h2>
          { org.updates.map((update) => (
            renderUpdateCard(org.name, update.space_name, update.folder_name, update.page_name)
          ))}
        </div>
      ))}
      
    </div>
  );
};