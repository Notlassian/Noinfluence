import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

export const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const { code } = queryString.parse(location.hash);

    if (code) {
      localStorage.setItem('code', code);
      navigate('/');
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
};
