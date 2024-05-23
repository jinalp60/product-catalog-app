import React from "react"
import PathConstants from "./pathConstants"
import { Navigate } from 'react-router-dom';

const Products = React.lazy(() => import("../../src/components/ProductTable/ProductTable"))
const AddProduct = React.lazy(() => import("../../src/components/AddProduct/AddProduct"))
const UpdateProduct = React.lazy(() => import("../../src/components/UpdateProduct/UpdateProduct"))

const routes = [
    { path: PathConstants.HOME, exact: true, element: <Navigate to="/products" /> },
    { path: PathConstants.PRODUCTS, element: <Products /> },
    { path: PathConstants.ADDPRODUCT, element: <AddProduct /> },
    { path: PathConstants.UPDATEPRODUCT, element: <UpdateProduct /> },
]

export default routes