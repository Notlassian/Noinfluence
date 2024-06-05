import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginLink, LogoutLink } from './authentication';
import './css/NavigationBar.css';

export const NavigationBar = () => {

  const {loggedIn, setLoggedIn} = useState(false);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'accessToken' && event.newValue) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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