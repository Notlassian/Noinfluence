import React, { useState, useEffect } from "react";
import { SettingTable } from "../components";
import './css/SpaceSetting.css';

export const OrganisationSetting = () => {

  const [users, setUsers] = useState([]);

  const organisationName = localStorage.getItem('organisationName');

  const fetchUsers = async () => {
    console.log("in org fetchUsers");
    const fetchUsersOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      console.log(`fetch org users url: ${process.env.REACT_APP_API_URL}/org/${organisationName}/admin/list`);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/org/${organisationName}/admin/list?orgname=${organisationName}`, fetchUsersOptions);
      const data = await response.json();
      console.log('organisation user data: ', data);

      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateRoles = async (updatedUsers) => {
    // try {
    //   await Promise.all(updatedUsers.map(async (user) => {
    //     const updateRolesOptions = {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ orgName: organisationName, user: user.username, role: user.role })
    //     };
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}/org/${organisationName}/spaces/${spaceName}/admin/update`, updateRolesOptions);
    //     const data = await response.json();
    //     console.log('Update response:', data);
    //   }));
    //   fetchUsers();
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-setting-container">

      <SettingTable users={users} onUpdateRoles={updateRoles}/>
    </div>
  );
};
