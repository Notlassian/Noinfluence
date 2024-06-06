import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LoginLink, LogoutLink } from './authentication';
import './css/NavigationBar.css';

export const NavigationBar = () => {

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (

    <nav className='nav'>

      <div className='nav-tabs'>

        <Link to='/' className='noinfluence-title'>
          Noinfluence
        </Link>
      </div>

      <div className='nav-profile'>

          <ul className='nav-list'>
            { currentPath === '/unauthorized' || currentPath === '/callback' ? <LoginLink /> : <LogoutLink /> }
          </ul>
          
      </div>
    </nav>
  );
};