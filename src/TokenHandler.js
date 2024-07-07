// components/TokenHandler.js
import { useEffect } from 'react';
import { storeToken } from './token.js';

const TokenHandler = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    if (token) {
      storeToken(token);
      // Clean the URL after storing the token
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, null, cleanUrl);
    }
  }, []);

  return null;
};

export default TokenHandler;
