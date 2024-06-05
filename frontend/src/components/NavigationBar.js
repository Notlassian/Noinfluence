import React from 'react';
import { Link } from 'react-router-dom';
import { LoginLink } from './authentication';
import './css/NavigationBar.css';

export const NavigationBar = () => {

  return (

    <nav className='nav'>

      <div className='nav-tabs'>

        <Link to='/' className='noinfluence-title'>
          Noinfluence
        </Link>
      </div>

      <div className='nav-profile'>

        <ul className='nav-list'>
          <LoginLink />
        </ul>
      </div>
    </nav>
  );
};