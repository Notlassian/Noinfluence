import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/HomeSideNavigationBar.css';

export const HomeSideNavigationBar = ({ sideNavBarItem }) => {

  const [sideNavBarWindow, setSideNavigationBar] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const navigate = useNavigate();

  const showSideNavigationBar = () => {
    setSideNavigationBar(!sideNavBarWindow);
  }

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const createOrganisation = () => {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ title: 'React POST Request Example' })
  //   };

  //   fetch('https://reqres.in/api/posts', requestOptions)
  //       .then(response => response.json())
  //       .then(data => this.setState({ postId: data.id }));
  }

  const createSpace = () => {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ title: 'React POST Request Example' })
  //   };

  //   fetch('https://reqres.in/api/posts', requestOptions)
  //       .then(response => response.json())
  //       .then(data => this.setState({ postId: data.id }));
  // navigate('/space');
  }

  const Organisations = [
    {
      name: 'Organisation 1',
      items: [
        ['Space 1', '/dot.png'],
      ]
    },
    {
      name: 'Organisation 2',
      items: [
        ['Space 4', '/dot.png'],
        ['Space 5', '/dot.png']
      ]
    }
  ];

  return (
    <nav className="sideNavBarWindow" style={{ width: sideNavBarWindow ? 250 : 60 }}>
      <div className="burger" onClick={showSideNavigationBar}>
        <img src="/menu.png" alt="menu-burger" />
      </div>

      { sideNavBarWindow &&
        <ul className="navbar-list">
          {Organisations.map((organisation, orgIndex) => (
            <li key={`organisation-${orgIndex}`} className="navbar-li-box">
              <div className="navbar-li" onClick={() => toggleExpanded(orgIndex)}>
                {organisation.name}
              </div>
              {expandedIndex === orgIndex && (
                <ul className="sub-list">
                  {organisation.items.map((item, itemIndex) => (
                    <li key={`item-${itemIndex}`} className="sub-item">
                      <div className="navbar-li" onClick={() => navigate('/space')}>
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
