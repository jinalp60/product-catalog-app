import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styles from './ProductTable.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from '@mkyy/mui-search-bar';
import axios from 'axios';


const ProductTable = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/getAllProducts')
        if (!response.data.productsFound) {
          throw new Error('Error fetching data from server');
        }
        setProducts(response.data.products)
        setFilteredProducts(response.data.products)
      } catch (error) {
        console.log("Error fetching data from server - handle")
      }
    };
    fetchProductsData();
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(searchedVal.toLowerCase()) || product.category.toLowerCase().includes(searchedVal.toLowerCase()) || product.price.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setFilteredProducts(filteredProducts);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };


  return (
    <div className={styles.ProductTable} data-testid="ProductTable">
      <SearchBar
        className={styles.searchBar}
        width='350px'
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelResearch={() => cancelSearch()}
      />
      <TableContainer component={Paper} className={styles.tableContent}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.name}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}

// ProductTable.propTypes = {};

// ProductTable.defaultProps = {};

export default ProductTable;
