import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authAPI } from 'services/Auth';
import { usersAPI } from 'services/Users';
import { userSlice } from './user/reducer';

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [userSlice.name]: userSlice.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authAPI.middleware).concat(usersAPI.middleware),
  });
};

export default setupStore;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
