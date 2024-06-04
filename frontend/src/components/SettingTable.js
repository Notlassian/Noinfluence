import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddSpaceUserPopUp } from './popup';
import './css/SettingTable.css';

export const SettingTable = ({ users, onUpdateRoles  }) => {

  const [userRoles, setUserRoles] = useState(users);

  const { organisationName, spaceName } = useParams();

  const handleRoleChange = (username, newRole) => {
    console.log('New Role:', newRole);
    console.log('Previous userRoles:', userRoles);

    setUserRoles(prevUserRoles =>
      prevUserRoles.map(user =>
        user.username === username ? { ...user, role: newRole } : user
      )
    );
  };

  const handleConfirmClick = () => {
    console.log('Updated userRoles:', userRoles);
    onUpdateRoles(userRoles);
  };

  useEffect(() => {
    console.log('UseEffect triggered. Updated users:', users);
    setUserRoles(users);
  }, [users]);

  return (

    <div className='space-setting-table'>

      <h2>Space Settings</h2>

      <table>

        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          {userRoles.map((user, index) => (

            <tr key={index}>
              <td>{user.username}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.username, e.target.value)}>

                  <option value='Administrator'>Administrator</option>
                  <option value='Editor'>Editor</option>
                  <option value='Viewer'>Viewer</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className='confirm-button' onClick={handleConfirmClick}>Confirm</button>

      <AddSpaceUserPopUp orgName={`${organisationName}`} spaceName={`${spaceName}`} />
    </div>
  );
};
