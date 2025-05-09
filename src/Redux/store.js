import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch {
    // Ignore write errors
  }
};

// Initialize with persisted state
const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  },
  preloadedState
});

// Subscribe to store changes
store.subscribe(() => {
  saveState(store.getState());
});