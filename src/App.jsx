import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/shared/AuthLayout/AuthLayout";
import MasterLayout from "./modules/shared/MasterLayout/MasterLayout"
import NotFound from "./modules/shared/NotFound/NotFound"
import Login from "./modules/Auth/Login/Login";
import Register from "./modules/Auth/Register/Register"
import Forgot from "./modules/Auth/Forgot/Forgot";
import Reset from "./modules/Auth/Reset/Reset";
import Verify from "./modules/Auth/Verify/Verify";
import Dashboard from "./modules/Dashboard/Dashboard"
import RecipeList from "./modules/Recipes/RecipeList/RecipeList"
import RecipeData from "./modules/Recipes/RecipesData/RecipeData"
import CategoriesList from "./modules/Categories/CategoriesList/CategoriesList"
import CategoryData from "./modules/Categories/CategoryData/CategoryData"
import UserList from "./modules/Users/UserList/UserList"
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/shared/ProtectedRoute/ProtectedRoute";
import ChangePass from "./modules/Auth/ChangePassword/ChangePass";


function App() {

  const [loginData, setLoginData] = useState(()=>{
    let token =localStorage.getItem('token');
    return token ? jwtDecode(token) : null
  });

    const saveLoginData = () => {
    const encodedToken = localStorage.getItem("token");

    if (!encodedToken) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const decodedToken = jwtDecode(encodedToken);
      setLoginData(decodedToken);
      console.log('Decoded Token:', decodedToken);
    } catch (error) {
      console.error('Invalid token format:', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token'))
      saveLoginData() 
  }, []);

      
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout loginData={loginData} />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forgot", element: <Forgot /> },
        { path: "reset", element: <Reset /> },
        { path: "verify", element: <Verify /> },
        { path: "change-pass", element: <ChangePass /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard loginData={loginData} /> },
        { path: "recipe-list", element: <RecipeList /> },
        { path: "recipe-data", element: <RecipeData /> },
        { path: "categories-list", element: <CategoriesList /> },
        { path: "category-data", element: <CategoryData /> },
        { path: "user-list", element: <UserList /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
