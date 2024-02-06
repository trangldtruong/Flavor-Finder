import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
//import NoMatch from "./pages/NoMatch.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
//import Success from "./pages/Success.jsx";
import Myrecipes from "./components/MyRecipes.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import RecipeForm from "./components/RecipeForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/myRecipes",
        element: <Myrecipes />,
      },
      {
        path: "/recipe-form",
        element: <RecipeForm />,
      },
      {
        path: "/recipes/:id",
        element: <RecipeDetail />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      /*{
        path: "/success",
        element: <Success />,
      },*/
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
