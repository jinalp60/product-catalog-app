import React from "react"
import PathConstants from "./pathConstants"
import { Navigate } from 'react-router-dom';

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

const Products = React.lazy(() => import("../../src/components/ProductTable/ProductTable"))
const AddProduct = React.lazy(() => import("../../src/components/AddProduct/AddProduct"))

const routes = [
    { path: PathConstants.HOME, exact: true, element: <Navigate to="/products" /> },
    { path: PathConstants.PRODUCTS, element: <Products products={PRODUCTS} /> },
    { path: PathConstants.ADDPRODUCT, element: <AddProduct /> },
]

export default routes