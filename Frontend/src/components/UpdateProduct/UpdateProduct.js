import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import axios from 'axios';
// import PropTypes from 'prop-types';
import styles from './UpdateProduct.module.css';

const UpdateProduct = () => {
  const [products, setProducts] = useState([])

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
  }, []);

  const initialProductState = {
    name: '',
    price: '',
    category: 'Fruits',
    stocked: true
  }

  const [updateProductData, setUpdateProductData] = useState(initialProductState);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    // Perform logic here with productData
    console.log('Update Product data:', updateProductData);
    try {
      const res = await axios.patch('http://127.0.0.1:8000/updateProduct', updateProductData);
      console.log(res.data)
      if (!res.data.isUpdated) {
        throw new Error('Error updating data');
      }
    } catch (error) {
      console.log("Error updating data - handle")
    }
    setUpdateProductData(initialProductState)
  };

  const getProductData = (e) => {
    console.log(e.target);
    for (let product of products) {
      if (e.target.value === product.name) {
        setUpdateProductData({
          name: product.name,
          price: product.price,
          category: product.category,
          stocked: product.stocked
        })
        break;
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setUpdateProductData({ ...updateProductData, [name]: value });
  };

  const handleChangeStocked = (e) => {
    const { name, checked } = e.target;
    setUpdateProductData({ ...updateProductData, [name]: checked });
  };

  return (
    <div className={styles.UpdateProduct} data-testid="UpdateProduct">
      <h2 className={styles.title}>Update Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <FormControl variant="filled" className={styles.textField} fullWidth>
          <InputLabel id="product-name">Name</InputLabel>
          <Select
            labelId="product-name-label"
            id="product-name"
            name="name"
            value={updateProductData.name}
            label="Name"
            onChange={getProductData}
          >
            {products.map((product) => (
              <MenuItem key={product.name} value={product.name}>{product.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Price ($)"
          variant="filled"
          fullWidth
          name="price"
          type="number"
          value={updateProductData.price}
          onChange={handleChange}
          className={styles.textField}
          required
        />

        <FormControl className={styles.formControl}>
          <FormLabel id="category">Category</FormLabel>
          <RadioGroup
            row
            aria-labelledby="category-radio-buttons-group-label"
            defaultValue="Fruits"
            name="category"
            value={updateProductData.category}
            onChange={handleChange}
          >
            <FormControlLabel value="Fruits" control={<Radio />} label="Fruits" />
            <FormControlLabel value="Vegetables" control={<Radio />} label="Vegetables" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormGroup className={styles.formGroup}>
          <FormControlLabel control={<Checkbox name="stocked" defaultChecked checked={updateProductData.stocked} onChange={handleChangeStocked} />} label="Stocked" />
        </FormGroup>

        <Button className={styles.updateProductBtn} type="submit" variant="contained" color="primary">
          Update product
        </Button>
      </form>
    </div>
  );
}
// UpdateProduct.propTypes = {};

UpdateProduct.defaultProps = {};

export default UpdateProduct;
