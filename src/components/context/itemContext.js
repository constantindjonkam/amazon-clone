import React, { createContext, useContext, useReducer } from "react";

export const ItemContext = createContext();

export const ItemProvider = ({ reducer, initialState, children }) => (
  <ItemContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ItemContext.Provider>
);

export const useItemValue = () => useContext(ItemContext);
