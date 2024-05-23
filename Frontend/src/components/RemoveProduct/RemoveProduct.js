import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
// import PropTypes from 'prop-types';
import styles from './RemoveProduct.module.css';

const RemoveProduct = () => {
  const [products, setProducts] = useState([])

  const [removeProductName, setRemoveProductName] = useState('');

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/getAllProducts')
        if (!response.data.productsFound) {
          throw new Error('Error fetching data from server');
        }
        setProducts(response.data.products)
      } catch (error) {
        console.log("Error fetching data from server - handle")
      }
    };
    fetchProductsData();
  }, [removeProductName]);


  const handleRemoveProduct = async (e) => {
    e.preventDefault();
    // Perform logic here with productData
    console.log('Remove Product name:', removeProductName);
    try {
      const res = await axios.delete('http://127.0.0.1:8000/removeProduct/' + removeProductName);
      console.log(res.data)
      if (!res.data.isDeleted) {
        throw new Error('Error deleting product');
      }
    } catch (error) {
      console.log("Error removing product - handle")
    }
    setRemoveProductName('')
  };

  const handleChange = (e) => {
    console.log(e.target);
    setRemoveProductName(e.target.value);
  };

  return (
    <div className={styles.RemoveProduct} data-testid="RemoveProduct">
      <h2 className={styles.title}>Remove Product</h2>
      <form onSubmit={handleRemoveProduct}>
        <FormControl variant="filled" className={styles.formControl} fullWidth>
          <InputLabel id="product-name">Name</InputLabel>
          <Select
            labelId="product-name-label"
            id="product-name"
            name="name"
            value={removeProductName}
            label="Name"
            onChange={handleChange}
          >
            {products.map((product) => (
              <MenuItem key={product.name} value={product.name}>{product.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button className={styles.removeProductBtn} type="submit" variant="contained" color="primary">
          Remove product
        </Button>
      </form>
    </div>
  );
}

// RemoveProduct.propTypes = {};

RemoveProduct.defaultProps = {};

export default RemoveProduct;
