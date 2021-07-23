import { configureStore } from '@reduxjs/toolkit';
import reducer from './counterSlice';

export default configureStore({
  reducer: {
      counter: reducer
  },
})