import React, { useState } from "react";
import './css/SettingTable.css';

export const SettingTable = () => {
  const [users] = useState([
    { id: 1, name: "User 1", role: "Admin" },
    { id: 2, name: "User 2", role: "Editor" },
    { id: 3, name: "User 3", role: "Viewer" }
  ]);

  const handleRoleChange = (userId, newRole) => {
    console.log(`User ${userId} role changed to ${newRole}`);
  };

  return (
    <div className="space-setting-table">

      <h2>Space Settings</h2>

      <table>

        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>

          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
