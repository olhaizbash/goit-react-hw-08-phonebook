import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from 'redux/selectors';

const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const autenticated = useSelector(selectAuth);
  return autenticated ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
