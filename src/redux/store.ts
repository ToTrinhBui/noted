import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const userPersistConfig = {
  key: 'auth',
  storage,
};

const rootReducer = {
  auth: persistReducer(userPersistConfig, userSlice.reducer),
};

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

// Add a function to clear the persisted state when logout is dispatched
const clearPersistedStateOnLogout = () => {
  persistor.persist(); // Persist the state before purging
  persistor.purge(); // Clear the entire persisted state from local storage
};

export { store, persistor, clearPersistedStateOnLogout };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch