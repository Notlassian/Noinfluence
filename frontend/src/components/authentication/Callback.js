import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postDataWithoutBearer } from '../../utils';

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
          } else {
            setError(true);
          }
        })
      })
      .catch(error => console.error(error));
    }
  }, [location, navigate]);

  if (error) return <div>Couldn't log you in please try again.</div>;

  return <div>Trying to log you in...</div>;
};
