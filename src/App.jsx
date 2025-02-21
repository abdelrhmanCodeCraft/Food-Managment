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

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot", element: <Forgot /> },
        { path: "reset", element: <Reset /> },
        { path: "verify", element: <Verify /> },
      ],
    },
    {
      path: "/dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
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
