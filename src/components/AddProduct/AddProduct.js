import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddProduct.module.css';

const AddProduct = () => (
  <div className={styles.AddProduct} data-testid="AddProduct">
    AddProduct Component
  </div>
);

AddProduct.propTypes = {};

AddProduct.defaultProps = {};

export default AddProduct;
