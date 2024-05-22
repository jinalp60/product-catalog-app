import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import axios from 'axios';
// import PropTypes from 'prop-types';

import styles from './AddProduct.module.css';
import { FormControl } from '@mui/material';

const AddProduct = () => {
  const initialProductState = {
    name: '',
    price: '',
    category: 'Fruits',
    stocked: true
  }

  const [addProductData, setAddProductData] = useState(initialProductState);


  const handleAddProduct = async (e) => {
    e.preventDefault();
    // Perform logic here with productData
    console.log('Add Produt data:', addProductData);
    try {
      const res = await axios.post('http://127.0.0.1:8000/addProduct', addProductData);
      console.log(res.data)
      if (!res.data.success) {
        throw new Error('Error fetching data from server');
      }
    } catch (error) {
      console.log("Error fetching data from server - handle")
    }
    setAddProductData(initialProductState)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setAddProductData({ ...addProductData, [name]: value });
  };

  const handleChangeStocked = (e) => {
    const { name, checked } = e.target;
    setAddProductData({ ...addProductData, [name]: checked });
  };

  return (
    <div className={styles.AddProduct} data-testid="AddProduct">
      <h2 className={styles.title}>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <TextField
          label="Name"
          variant="filled"
          fullWidth
          name="name"
          value={addProductData.name}
          onChange={handleChange}
          className={styles.textField}
          required
        />
        <TextField
          label="Price ($)"
          variant="filled"
          fullWidth
          name="price"
          type="number"
          value={addProductData.price}
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
            onChange={handleChange}
            
          >
            <FormControlLabel value="Fruits" control={<Radio />} label="Fruits" />
            <FormControlLabel value="Vegetables" control={<Radio />} label="Vegetables" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormGroup className={styles.formGroup}>
          <FormControlLabel control={<Checkbox name="stocked" defaultChecked onChange={handleChangeStocked} />} label="Stocked" />
        </FormGroup>

        <Button className={styles.addProductBtn} type="submit" variant="contained" color="primary">
          Add product
        </Button>
      </form>
    </div>
  );
}

// AddProduct.propTypes = {};

AddProduct.defaultProps = {};

export default AddProduct;
