// src/store/index.ts
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware();
    if (__DEV__) {
      try {
        const createDebugger = require('redux-flipper').default;
        return middleware.concat(createDebugger());
      } catch (e) {
        console.warn('Failed to create redux-flipper debugger:', e);
        return middleware;
      }
    }
    return middleware;
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
