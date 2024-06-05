import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateSpacePopUp, CreateOrganisationPopUp } from '../popup';
import { AlertType, HttpStatusCodes, getData, showAlert } from '../../utils';
import '../css/HomeSideNavigationBar.css';

export const HomeSideNavigationBar = () => {

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [organisations, setOrganisations] = useState([]);
  const [isOrgAdmins, setIsOrgAdmins] = useState([]);

  const navigate = useNavigate();

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const fetchOrganisations = React.useCallback(async () => {
    try {
      const response = await getData('org/list', localStorage.getItem("accessToken"));

      if (response.ok) {
        const data = await response.json();

        const formattedData = Object.entries(data).map(([key, value]) => ({
          name: key,
          items: value.map(space => [space])
        }));

        const isAdminPromises = formattedData.map(async (item) => {
          const response = await getData(`org/${item.name}/admin/check`, localStorage.getItem('accessToken'));
          return response.ok;
        });

        const isAdminArr = await Promise.all(isAdminPromises);

        setIsOrgAdmins(isAdminArr);
        setOrganisations(formattedData);
      } else if (response.status === HttpStatusCodes.Unauthorized) {
        showAlert(`You are not logged in, please login to continue.`, AlertType.Info);
        navigate("/unauthorized");
      }

    } catch (error) {
      console.error('Error:', error);
      showAlert(`Couldn't retrieve your organisations, please try again in a moment. If this error continues, please contact Noinfluence support.`, AlertType.Error);
    }
  }, [navigate]);

  const onOrganisationClick = (organisationName, spaceName) => {
    navigate(`/${organisationName}/${spaceName}`);
  }

  useEffect(() => {
    fetchOrganisations();
  }, [fetchOrganisations]);

  return (

    <nav className='sideNavBarWindow' >

      <ul className="navbar-list">

        {organisations.map((organisation, orgIndex) => (
          <li key={`organisation-${orgIndex}`} className="navbar-li-box">

            <div className="navbar-li" onClick={() => toggleExpanded(orgIndex)}>

              <img className='organisation-icon' src='/organisation.png' alt='organisation'/>
              <span className="organisation-name">{organisation.name}</span>

              {isOrgAdmins[orgIndex] && (
                <button
                  className="navbar-li-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/${organisation.name}/settings`);
                  }}>

                  {'Setting'}
                </button>
              )}
            </div>

            {expandedIndex === orgIndex && (

              <ul className="sub-list">

                {organisation.items.map((item, itemIndex) => (
                  <li key={`item-${itemIndex}`} className="sub-item">

                    <div className="navbar-li" onClick={() => onOrganisationClick(organisation.name,item[0])}>

                      <img className='space-icon' src='/space.png' alt='space'/>
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
        <CreateOrganisationPopUp refresh={fetchOrganisations}/>
      </div>
    </nav>
  );
};
