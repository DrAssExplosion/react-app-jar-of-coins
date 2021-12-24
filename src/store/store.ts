import { combineReducers } from 'redux';
import currentJarSlice from './reducers/currentJar';
import allJarsSlice from './reducers/allJars';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  currentJar: currentJarSlice,
  allJars: allJarsSlice
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
