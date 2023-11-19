import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from 'redux/selectors';

const RestrictedRoute = ({ children, redirectTo = '/contacts' }) => {
  const autenticated = useSelector(selectAuth);
  return autenticated ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
