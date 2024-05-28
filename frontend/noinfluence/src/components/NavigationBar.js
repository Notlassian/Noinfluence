import { Link } from "react-router-dom";
// import Popup from 'reactjs-popup';
import './NavigationBar.css';

export const NavigationBar = () => {

  return (

    <nav className="nav">

      <div className="nav-tabs">

        <Link to="/" className="noinfluence-title">
          Dashboard
        </Link>

        <ul className="nav-list">
          <li><Link to="/space">Space</Link></li>
        </ul>

        <button>
          Create Page
        </button>
      </div>

      <div className="nav-profile">

        <ul className="nav-list">

          <button>
            Log In
          </button>

          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
    </nav>
  );
};