import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./root.reducer";

// Middleware
const middleWares = [composeWithDevTools(logger)];

// Config
const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

// persistReducer
const persistRootReducer = persistReducer(persistConfig, rootReducer);

// Config store
export const store = configureStore({
  reducer: rootReducer,
  middleWares: (getDefaultMiddleWares) => {
    getDefaultMiddleWares({
      serializableCheck: false,
    }).concat(middleWares);
  },
});

// export persistor
// export const persistor = persistStore(store);
