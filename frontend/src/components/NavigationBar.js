import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginLink } from './authentication';
import './css/NavigationBar.css';

export const NavigationBar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  useEffect(() => {

    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (

    <nav className='nav'>

      <div className='nav-tabs'>

        <Link to='/' className='noinfluence-title'>
          Noinfluence
        </Link>
      </div>

      <div className='nav-profile'>

        { !isLoggedIn &&

          <ul className='nav-list'>
            <LoginLink />
          </ul>
        }
      </div>
    </nav>
  );
};