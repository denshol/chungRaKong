// src/store/reducer.ts
import {combineReducers} from 'redux';
import userReducer from '../slices/user';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
