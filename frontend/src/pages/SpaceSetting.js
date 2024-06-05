import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SettingTable, SpaceSideNavigationBar } from '../components';
import { getData, postData } from '../utils';
import './css/SpaceSetting.css';

export const SpaceSetting = () => {

  const [users, setUsers] = useState([]);

  const { orgName, spaceName } = useParams();

  console.log(orgName + '/' + spaceName);

  const fetchUsers = React.useCallback(async () => {

    try {

      const response = await getData(`org/${orgName}/spaces/${spaceName}/admin/list`, localStorage.getItem('accessToken'));
      const data = await response.json();
      console.log('data: ', data);

      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [orgName, spaceName]);

  const updateRoles = async (updatedUsers) => {

    try {

      await Promise.all(updatedUsers.map(async (user) => {

        const response = await postData(`org/${orgName}/spaces/${spaceName}/admin/update`, { user: user.username, role: user.role }, localStorage.getItem('accessToken'));
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
  }, [
    fetchUsers
  ]);

  return (

    <div className='space-setting-container'>

      <SpaceSideNavigationBar />

      <SettingTable users={users} onUpdateRoles={updateRoles}/>
    </div>
  );
};
