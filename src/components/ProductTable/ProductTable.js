import React, {useState} from 'react';
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


const ProductTable = ({ products }) => {
  console.log("ProductTable products:", products)
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searched, setSearched] = useState("");

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
