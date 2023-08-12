import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import logger from "redux-logger";

import { rootReducer } from "./root.reducer";

// Middleware
const middleWares = new MiddlewareArray().concat(logger);

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
  middleware: middleWares
});

// export persistor
// export const persistor = persistStore(store);

// export typescript type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
