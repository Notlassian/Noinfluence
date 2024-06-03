import React from 'react';
import { Link } from "react-router-dom";
import { LoginLink } from './authentication';
import {PageCreator} from './PageCreator'
import './css/NavigationBar.css';

export const NavigationBar = () => {

  return (

    <nav className="nav">

      <div className="nav-tabs">

        <Link to="/" className="noinfluence-title">
          Noinfluence
        </Link>

        <PageCreator orgName="myOrg" spaceName="mySpace"/>
      </div>

      <div className="nav-profile">

        <ul className="nav-list">

          <LoginLink>
            <Link to="/login">Log In</Link>
          </LoginLink>
        </ul>
      </div>
    </nav>
  );
};