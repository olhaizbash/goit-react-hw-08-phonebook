import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactDetailsReducer } from './reducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { contactReducer } from './contactsReduser';
const persistConfig = {
  key: 'contactDetails',
  storage,
  whitelist: ['token'],
};

export const rootReducer = combineReducers({
  contactDetails: persistReducer(persistConfig, contactDetailsReducer),
  contacts: contactReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
