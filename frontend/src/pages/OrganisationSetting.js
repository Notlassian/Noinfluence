import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OrgSettingsTable } from '../components';
import { HomeSideNavigationBar } from '../components';
import { AlertType, HttpStatusCodes, getData, showAlert } from '../utils';
import './css/SpaceSetting.css';

export const OrganisationSetting = () => {

  const [users, setUsers] = useState([]);

  const { orgName } = useParams();

  const navigate = useNavigate();

  console.log(orgName);

  const fetchUsers = React.useCallback(async () => {
    console.log('in org fetchUsers');

    try {

      console.log(`fetch org users url: ${process.env.REACT_APP_API_URL}/org/${orgName}/admin/list`);
      const response = await getData(`org/${orgName}/admin/list`, localStorage.getItem('accessToken'));

      if (response.ok) {
        const data = await response.json();
        console.log('organisation user data: ', data);

        setUsers(data);
      } else if (response.status === HttpStatusCodes.Forbidden) {
        showAlert(`You are unable to view this organisations settings.`, AlertType.Info);
        navigate('/');
      }
      
    } catch (error) {
      console.error('Error:', error);
      showAlert(`Unable to retrieve user list for space, please make sure you are logged in.`, AlertType.Error);
    }
  }, [orgName]);

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
