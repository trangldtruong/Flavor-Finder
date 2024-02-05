import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    recipes: [],
    currentRecipe: null,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
