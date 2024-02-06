import {
  SET_RECIPES,
  SET_CURRENT_RECIPE,
  CLEAR_CURRENT_RECIPE,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case SET_CURRENT_RECIPE:
      return {
        ...state,
        currentRecipe: action.payload,
      };
    case CLEAR_CURRENT_RECIPE:
      return {
        ...state,
        currentRecipe: null,
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };
    default:
      return state;
  }
};
