/**
 * Manages Redux storage
 */
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// All reducers
import characters from "./pages/main/ducks";
import detail from "./pages/detail/ducks";

// Combine all storage in a single object
const rootReducer = combineReducers({
  characters,
  detail
});

// configureStore adds browser devtools, thunk automatically
const store = configureStore({ reducer: rootReducer });

export default store;
