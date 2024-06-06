import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertType, postDataWithoutBearer, showAlert } from '../utils';
import './css/Callback.css';

export const Callback = () => {

  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get('code')

    if (code) {

      postDataWithoutBearer('auth/token', { code: code })
      .then((response) => {

        response.json().then((body) => {

          if (response.ok) {

            const { access_token, id_token, refresh_token } = body;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('idToken', id_token);
            localStorage.setItem('refreshToken', refresh_token);
            navigate('/');
            showAlert('Successfully logged in, welcome to Noinfluence.', AlertType.Success);
          } else {
            setError(true);
            showAlert('An error occured with validating your login, please try logging in again.', AlertType.Error);
          }
        })
      })
      .catch(error => {
        setError(true);
        showAlert('Unable to validate your login token, please try again in a moment. If this error continues, please contact Noinfluence support', AlertType.Error);
      });
    } else {
      navigate("/unauthorized");
    }
  }, [location, navigate]);

  if (error) return <div className='callback-content'>
      <img className='login-failed-image' src = "/login-failed.svg" alt="Login Failed"/>
      <h1>Couldn't log you in, please try logging in again.</h1>
    </div>;

  return <div className='callback-content'>
      <img className='logging-in-image' src = "/logging-in.svg" alt="Logging In"/>
      <h1>Trying to log you in...</h1>
    </div>;
};
