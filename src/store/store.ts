import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import logger from "redux-logger";

import rootReducer, { RootState } from "./root-reducer";

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

const configMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
) => {
  const defaultMiddle = () =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  if (process.env.NODE_ENV === `development`) {
    return defaultMiddle().concat(logger);
  }
  return defaultMiddle();
};

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      configMiddleware(getDefaultMiddleware),
  });
};

export const persistor = persistStore(setupStore());
