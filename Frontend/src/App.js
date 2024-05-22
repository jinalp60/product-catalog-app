import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import routes from "./routes"
import Layout from './components/Layout/Layout';
import Page404 from './components/Page404/Page404'

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Page404 />,
      children: routes
    },
  ])

  return (
      <RouterProvider router={router} />
  )
}

export default App;
