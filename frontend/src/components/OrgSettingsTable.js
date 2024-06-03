import React, { useState, useEffect } from "react";
import './css/SettingTable.css';

export const OrgSettingsTable = ({ users }) => {

  const [userRoles, setUserRoles] = useState(users);

  useEffect(() => {
    setUserRoles(users);
  }, [users]);

  return (
    <div className="space-setting-table">

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
    </div>
  );
};
