import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertType, HttpStatusCodes, getData, postData, showAlert } from '../utils';
import { SettingTable, SpaceSideNavigationBar } from '../components';
import './css/SpaceSetting.css';

export const SpaceSetting = () => {

  const [users, setUsers] = useState([]);

  const { orgName, spaceName } = useParams();

  console.log(orgName + '/' + spaceName);

  const navigate = useNavigate();

  const fetchUsers = React.useCallback(async () => {

    try {

      const response = await getData(`org/${orgName}/spaces/${spaceName}/admin/list`, localStorage.getItem('accessToken'));
      if (response.ok) {
        const data = await response.json();
        console.log('data: ', data);

        setUsers(data);
      } else if (response.status === HttpStatusCodes.Forbidden) {
        showAlert(`You are unable to view this spaces settings.`, AlertType.Info);
        navigate(`/${orgName}/${spaceName}`);
      } else {
        showAlert(`Unable to view user list for this space, please contact Noinfluence support`, AlertType.Error);
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert(`Unable to view user list for this space, please try in a moment. If this error continues, please contact Noinfluence support.`, AlertType.Error);
    }
  }, [orgName, spaceName, navigate]);

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
      showAlert(`Unable to retrieve admin list, please make sure you are logged in.`, AlertType.Error);
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
