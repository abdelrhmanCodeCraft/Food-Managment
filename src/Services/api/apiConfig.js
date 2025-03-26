export const baseUrl = "https://upskilling-egypt.com:3006/api/v1/";
export const IMAGE_URL = "https://upskilling-egypt.com:3006/";


export const USER_URL = {
  LOGIN: `Users/Login`,
  REGISTER: `Users/Register`,
  FORGOT: `Users/Reset/Request`,
  RESET: `Users/Reset`,
  VERIFY: `Users/Login`,
  CHANGE_PASS: `Users/ChangePassword`,
  GET_USER: (id) => `/users/${id}`,
};


export const CATEGORIES_URL = {
  GET_CATEGORY: "Category/",
  DELETE_CATEGORY: (id) => `/Category/${id}`,
  POST_CATEGORY: "Category",
  UPDATE_CATEGORY: (id) => `/Category/${id}`,
};


export const RECIPES_URL = {
  GET_RECIPES: "Recipe/",
  GET_RECIPE: (id) => `/Recipe${id}`,
  POST_RECIPE: "Recipe",
  DELETE_RECIPE: (id) => `/Recipe/${id}`,
  UPDATE_RECIPE: (id) => `/Recipe${id}`,
};

export const Users_Urls = {
  Get_Users: `Users`,
  Delete_Users: `Users`,
};
export const FAVS_URLS = {
  Get_Favs: `userRecipe`,
  ADD_Favs: `userRecipe`,
};

export const TAGS_URL = {
    GET_TAG : "tag/"
}
