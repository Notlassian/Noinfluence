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

  const fetchUsers = React.useCallback(async () => {
    try {
      const response = await getData(`org/${orgName}/admin/list`, localStorage.getItem('accessToken'));

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else if (response.status === HttpStatusCodes.Forbidden) {
        showAlert(`You are unable to view this organisations settings.`, AlertType.Info);
        navigate('/');
      } else {
        showAlert(`Unable to view admin list, please contact Noinfluence support`, AlertType.Error);
      }
      
    } catch (error) {
      console.error('Error:', error);
      showAlert(`Unable to view admin list, please try again in a moment. If this issue continues, please contact Noinfluence support`, AlertType.Error);
    }
  }, [orgName, navigate]);

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
