import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './css/SpaceDashBoard.css';

export const SpaceDashboard = ({ description, openIssues, openIssuesNum, completedIssuesNum }) => {

  const issueData = {
    labels: ['Open', 'Completed'],
    datasets: [
      {
        data: [openIssuesNum, completedIssuesNum],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="dashboard">

      <div className='LeftComponent'>

        <div className="card">

          <h5>Space Description</h5>
          <p>{description}</p>
        </div>

        <div className="card">

          <h5>Open Issues</h5>
          <ul>

            {openIssues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>
      </div>


      <div className="chart">

        <h5>Issues</h5>
        <Pie data={issueData} />
      </div>
    </div>
  );
};