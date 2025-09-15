// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { emptySplitApi } from "./rtk/emptySplitApi.ts";
 
export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

// Types for convenience
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
