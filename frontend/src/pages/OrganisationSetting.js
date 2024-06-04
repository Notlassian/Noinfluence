import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { OrgSettingsTable } from '../components';
import { HomeSideNavigationBar } from '../components';
import { getData } from '../utils';
import './css/SpaceSetting.css';

export const OrganisationSetting = () => {

  const [users, setUsers] = useState([]);

  const { orgName } = useParams();

  console.log(orgName);

  const fetchUsers = React.useCallback(async () => {
    console.log('in org fetchUsers');

    try {

      console.log(`fetch org users url: ${process.env.REACT_APP_API_URL}/org/${orgName}/admin/list`);
      const response = await getData(`org/${orgName}/admin/list`, localStorage.getItem('accessToken'));
      const data = await response.json();
      console.log('organisation user data: ', data);

      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [orgName]);

  // const updateRoles = async (updatedUsers) => {
  //   try {
  //     await Promise.all(updatedUsers.map(async (user) => {
  //       const response = await postData(`org/${orgName}/admin/add`, { user: user.username }, localStorage.getItem('accessToken'));
  //       const data = await response.json();
  //       console.log('Update response:', data);
  //     }));
  //     fetchUsers();
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  useEffect(() => {
    fetchUsers();
  }, [
    fetchUsers
  ]);

  return (
    <div className='space-setting-container'>

      <HomeSideNavigationBar/>

      <OrgSettingsTable users={users}/>
    </div>
  );
};
