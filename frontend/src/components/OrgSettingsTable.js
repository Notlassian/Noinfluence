import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddOrgUserPopUp } from './popup';
import './css/SettingTable.css';

export const OrgSettingsTable = ({ users, refresh }) => {

  const [userRoles, setUserRoles] = useState(users);

  const { orgName } = useParams();

  useEffect(() => {
    setUserRoles(users);
  }, [users]);

  return (
    <div className='space-setting-table-container'>
      <div className='space-setting-table'>

        <h2>Organization Settings</h2>

        <table>

          <thead>
            <tr>
              <th>Admins</th>
            </tr>
          </thead>

          <tbody>

            {userRoles.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <AddOrgUserPopUp orgName={orgName} refresh={refresh}/>
      </div>
    </div>
  );
};
