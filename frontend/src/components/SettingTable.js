import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddSpaceUserPopUp } from './popup';
import './css/SettingTable.css';

export const SettingTable = ({ users, onUpdateRoles, refresh  }) => {

  const [userRoles, setUserRoles] = useState(users);

  const { orgName, spaceName } = useParams();

  const handleRoleChange = (username, newRole) => {
    setUserRoles(prevUserRoles =>
      prevUserRoles.map(user =>
        user.username === username ? { ...user, role: newRole } : user
      )
    );
  };

  const handleConfirmClick = () => {
    onUpdateRoles(userRoles);
  };

  useEffect(() => {
    setUserRoles(users);
  }, [users]);

  return (
    <div className='space-setting-table-container'>
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

        <button className='confirm-button' onClick={handleConfirmClick}>Update Role</button>

        <AddSpaceUserPopUp orgName={`${orgName}`} spaceName={`${spaceName}`} refresh={refresh}/>
      </div>
    </div>
  );
};
