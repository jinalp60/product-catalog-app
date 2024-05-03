import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import ResponsiveAppBar from '../../components/ResponsiveAppBar/ResponsiveAppBar';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';


const Layout = () => (
  <div className={styles.Layout} data-testid="Layout">
    <ResponsiveAppBar></ResponsiveAppBar>
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>

  </div>
);

// Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;
