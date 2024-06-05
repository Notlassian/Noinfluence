import React from 'react';
import { cognitoConfig } from './CognitoConfig';

const getLoginUrl = () => {
  return `https://${cognitoConfig.domain}/login?response_type=code&client_id=${cognitoConfig.clientId}&scope=${cognitoConfig.scope}&redirect_uri=${encodeURIComponent(cognitoConfig.redirectUri)}`;
};

const getLogoutUrl = () => {
  localStorage.clear();
  return `https://${cognitoConfig.domain}/logout?client_id=${cognitoConfig.clientId}&redirect_uri=${encodeURIComponent(cognitoConfig.redirectUri)}`;
};

export const LoginLink = () => (
  <a href={getLoginUrl()}><button>Login</button></a>
);

export const LogoutLink = () => (
  <a href={getLogoutUrl()}><button>Logout</button></a>
);