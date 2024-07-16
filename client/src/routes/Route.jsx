import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Brands from "../pages/Brands";
import Addcars from "../pages/Addcars";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
      },
      {
        path: "/register",
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/add",
        element: <Addcars />
      },
      {
        path: "/brands",
        element: <Brands />
      }
    ],
    errorElement: <Error />
  },
]);

export default router;