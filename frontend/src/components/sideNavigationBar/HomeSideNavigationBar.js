import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateSpacePopUp, CreateOrganisationPopUp } from '../popup';
import { getData } from '../../utils';
import '../css/HomeSideNavigationBar.css';

export const HomeSideNavigationBar = () => {

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [organisations, setOrganisations] = useState([]);
  const [isOrgAdmins, setIsOrgAdmins] = useState([]);

  const navigate = useNavigate();

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const fetchOrganisations = async () => {
    try {
      const response = await getData('org/list', localStorage.getItem("accessToken"));
      const data = await response.json();

      const formattedData = Object.entries(data).map(([key, value]) => ({
        name: key,
        items: value.map(space => [space])
      }));

      console.log(formattedData);

      const isAdminPromises = formattedData.map(async (item) => {
        const response = await getData(`org/${item.name}/admin/check`);
        return response.ok;
      });

      const isAdminArr = await Promise.all(isAdminPromises);

      console.log(isAdminArr);

      setIsOrgAdmins(isAdminArr);
      setOrganisations(formattedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onOrganisationClick = (organisationName, spaceName) => {
    navigate(`/${organisationName}/${spaceName}`);
  }

  useEffect(() => {
    fetchOrganisations();
  }, []);

  return (

    <nav className='sideNavBarWindow' >

      <ul className="navbar-list">
        {organisations.map((organisation, orgIndex) => (
          <li key={`organisation-${orgIndex}`} className="navbar-li-box">
            <div className="navbar-li" onClick={() => toggleExpanded(orgIndex)}>

              {organisation.name}

              {isOrgAdmins[orgIndex] ? (
                <div className="navbar-li-button-container">
                  <button
                    className="navbar-li-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/${organisation.name}/settings`);
                    }}
                  >
                    {'Setting'}
                  </button>
                </div>
              ) : null}
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
                  { isOrgAdmins[orgIndex] ? <CreateSpacePopUp orgName={organisation.name}/> : null }
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="create-button-container">
        <CreateOrganisationPopUp/>
      </div>
    </nav>
  );
};
