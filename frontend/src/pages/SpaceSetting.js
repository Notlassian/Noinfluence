import React, { useState, useEffect } from "react";
import { SettingTable } from "../components";
import './css/SpaceSetting.css';
import { useParams } from "react-router-dom";
import { getData, postData } from "../utils";

export const SpaceSetting = () => {

  const [users, setUsers] = useState([]);

  const { orgName, spaceName } = useParams();

  console.log(orgName + "/" + spaceName);

  const fetchUsers = async () => {

    try {
      const response = await getData(`org/${orgName}/spaces/${spaceName}/admin/list`, localStorage.getItem("accessToken"));
      const data = await response.json();
      console.log('data: ', data);

      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateRoles = async (updatedUsers) => {
    try {
      await Promise.all(updatedUsers.map(async (user) => {
        const response = await postData(`org/${orgName}/spaces/${spaceName}/admin/update`, { user: user.username, role: user.role }, localStorage.getItem("accessToken"));
        const data = await response.json();
        console.log('Update response:', data);
      }));
      fetchUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  });

  return (
    <div className="space-setting-container">

      <SettingTable users={users} onUpdateRoles={updateRoles}/>
    </div>
  );
};
