import React, { useState } from "react";
import '../css/HomeSideNavigationBar.css';

export const HomeSideNavigationBar = ({sideNavBarItem}) => {

  const [ sideNavBarWindow, setSideNavigationBar ] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const showSideNavigationBar = () => {
    setSideNavigationBar(!sideNavBarWindow);
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className="sideNavBarWindow" style={{ width: sideNavBarWindow === false ? 60 : 250 }}>
      <div className="burger" onClick={() => showSideNavigationBar()}>

        <img src="/menu.png" alt="menu-burger" />
      </div>

      <ul className="navbar-list">

        <div className="navbar-li-box" key={1}>
          <img
            src={'/dot.png'}
            alt={'Organisations'}
            style={{ paddingLeft: sideNavBarWindow === false ? 17 : 27 }}/>

          <li
            className="navbar-li"
            style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}
            onClick={toggleExpanded}>

            {'Organisations'}
          </li>

          {isExpanded && sideNavBarItem.map((item, i) => (
              <div className="navbar-li-box" key={(2+i)}>
                <img
                  src={item[1]}
                  alt={item[1]}
                  style={{ paddingLeft: sideNavBarWindow === false ? 17 : 27 }}/>

                <li
                  className="navbar-li"
                  style={{ display: sideNavBarWindow === false ? "none" : "inline-block" }}>
                  {item[0]}
                </li>
              </div>
            ))}
        </div>
      </ul>
    </nav>
  );
};
