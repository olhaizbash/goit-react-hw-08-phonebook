import css from './App.module.css';

import { Route, Routes, NavLink } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Loader } from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, selectIsLoading } from 'redux/selectors';
import { refreshUser } from 'redux/reducer';
import RestrictedRoute from './RestrictedRoure';
import PrivateRoute from './PrivateRoute';
import UserData from './UserData/UserData';

const HomePage = lazy(() => import('pages/HomePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LogInPage = lazy(() => import('pages/LogInPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));

export function App() {
  const authenticated = useSelector(selectAuth);
  const isRefreshing = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <header>
        <nav className={css.navlist}>
          <NavLink className={css.navitem} to="/">
            Home
          </NavLink>

          {authenticated ? (
            <>
              <NavLink className={css.navitem} to="/contacts">
                Contacts
              </NavLink>
              <UserData className={css.contacts} />
            </>
          ) : (
            <div className={css.user}>
              <NavLink className={css.navitem} to="/login">
                Login
              </NavLink>
              <NavLink className={css.navitem} to="/register">
                Register
              </NavLink>
            </div>
          )}
        </nav>
      </header>

      {isRefreshing ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute>
                  <RegisterPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute>
                  <LogInPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      )}
    </>
  );
}
