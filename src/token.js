// utils/token.js
export const storeToken = (token) => {
  localStorage.setItem('jwtToken', token); // Store token in local storage
};

export const getToken = () => {
  return localStorage.getItem('jwtToken');
};
