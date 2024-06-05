import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginLink, LogoutLink } from './authentication';
import './css/NavigationBar.css';

export const NavigationBar = () => {

  const {loggedIn, setLoggedIn} = useState(false);

  useEffect(() => {
    const testLoggedInInterval = setInterval(() => {
      const val = localStorage.getItem('accessToken');
      if (val) {
        setLoggedIn(true);
      } else {
        localStorage.clear();
        setLoggedIn(false);
      }
    }, 1000);
  
    return () => clearInterval(testLoggedInInterval);
  }, [setLoggedIn]);

  return (

    <nav className='nav'>

      <div className='nav-tabs'>

        <Link to='/' className='noinfluence-title'>
          Noinfluence
        </Link>
      </div>

      <div className='nav-profile'>

        <ul className='nav-list'>
          { loggedIn ? <LogoutLink /> : <LoginLink /> }
        </ul>
      </div>
    </nav>
  );
};