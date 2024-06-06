import React, { useEffect, useState } from 'react';
import { HomeDashboard, HomeSideNavigationBar } from '../components';
import { AlertType, getData, showAlert } from '../utils';
import './css/Home.css';

export const Home = () => {

  const [updates, setUpdates] = useState([]);

  const fetchUpdates = React.useCallback(async () => {
    try {
      const response = await getData(`org/updates`, localStorage.getItem("accessToken"));

      if (response.ok) {
        const data = await response.json();
        setUpdates(data);
      } else {
        showAlert(`Unable to get your updates, please contact Noinfluence support`, AlertType.Error);
      }

    } catch (error) {
      showAlert(`Unable to get your updates, please try again in a moment. If this issue continues, please contact Noinfluence support`, AlertType.Error);
    }
  }, []);

  useEffect(() => {
    fetchUpdates();
  }, [fetchUpdates]);

  return (
    <div className='home-container'>

      <HomeSideNavigationBar/>

      <HomeDashboard recentUpdates={updates} />
    </div>
  );
};