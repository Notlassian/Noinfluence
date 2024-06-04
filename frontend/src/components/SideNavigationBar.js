import React, { useState } from 'react';
import './SideNavigationBar.css';

export const SideNavigationBar = ({sideNavBarItem}) => {

  const [ sideNavBarWindow, setSideNavigationBar ] = useState(false);

  const showSideNavigationBar = () => {
    setSideNavigationBar(!sideNavBarWindow);
  }

  return (

    <nav className='sideNavBarWindow' style={{ width: sideNavBarWindow === false ? 60 : 250 }}>

      <div className='burger' onClick={() => showSideNavigationBar()}>
        <img src='/menu.png' alt='menu-burger' />
      </div>

      <ul className='navbar-list'>

        {sideNavBarItem.map((item, i) => (

          <div className='navbar-li-box' key={i}>

            <img
              src={item[1]}
              alt={item[1]}
              style={{ paddingLeft: sideNavBarWindow === false ? 17 : 27 }}/>

            <li
              className='navbar-li'
              style={{ display: sideNavBarWindow === false ? 'none' : 'inline-block' }}>
              {item[0]}
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
};
