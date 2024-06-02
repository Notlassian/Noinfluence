import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/HomeSideNavigationBar.css';

export const HomeSideNavigationBar = () => {

  const [sideNavBarWindow, setSideNavigationBar] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [organisations, setOrganisations] = useState([]);
  const [newOrganisationName, setNewOrganisationName] = useState('');

  const navigate = useNavigate();

  const showSideNavigationBar = () => {
    setSideNavigationBar(!sideNavBarWindow);
  }

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const fetchOrganisations = async () => {
    const fetchOrganisationsOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/org/list`, fetchOrganisationsOptions);
      const data = await response.json();

      const formattedData = Object.entries(data).map(([key, value]) => ({
        name: key,
        items: value.map(space => [space])
      }));

      setOrganisations(formattedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createOrganisation = async () => {
    // const createOrganisationOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ org: newOrganisationName })
    // };

    // try {
    //   const response = await fetch(`${process.env.REACT_APP_API_URL}/org/create`, createOrganisationOptions);
    //   const result = await response.json();

    //   if (response.ok) {
    //     setNewOrganisationName('');
    //     fetchOrganisations();
    //   } else {
    //     alert(result.error);
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  const createSpace = () => {
  }

  const onOrganisationClick = (organisationName, spaceName) => {
    console.log('organisationName:',organisationName);
    localStorage.setItem('organisationName', organisationName);
    localStorage.setItem('spaceName', spaceName);
    navigate(`/${organisationName}/${spaceName}`);
  }

  useEffect(() => {
    fetchOrganisations();
  }, []);

  return (
    <nav className="sideNavBarWindow" style={{ width: sideNavBarWindow ? 250 : 60 }}>
      <div className="burger" onClick={showSideNavigationBar}>
        <img src="/menu.png" alt="menu-burger" />
      </div>

      { sideNavBarWindow &&
        <ul className="navbar-list">
          {organisations.map((organisation, orgIndex) => (
            <li key={`organisation-${orgIndex}`} className="navbar-li-box">
              <div className="navbar-li" onClick={() => toggleExpanded(orgIndex)}>
                {organisation.name}
              </div>
              {expandedIndex === orgIndex && (
                <ul className="sub-list">
                  {organisation.items.map((item, itemIndex) => (
                    <li key={`item-${itemIndex}`} className="sub-item">
                      <div className="navbar-li" onClick={() => onOrganisationClick(organisation.name,item[0])}>
                        {item[0]}
                      </div>
                    </li>
                  ))}
                  <li>
                    <button className="create-button" onClick={createSpace}>Create a Space</button>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      }

      { sideNavBarWindow &&

        <div className="create-button-container">
          <button className="create-button" onClick={createOrganisation}>Create an Organisation</button>
        </div>
      }
    </nav>
  );
};
