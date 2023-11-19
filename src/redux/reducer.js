import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import {
  requestLogIn,
  requestLogOut,
  requestRefresh,
  requestRegister,
  setToken,
} from 'components/services/api';

export const logIn = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const contacts = await requestLogIn(formData);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registration = createAsyncThunk(
  'auth/registration',
  async (formData, thunkAPI) => {
    try {
      const contacts = await requestRegister(formData);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.contactDetails.token;
      setToken(token);
      const contacts = await requestRefresh();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.contactDetails.token;

      if (!token) return false;
      return true;
    },
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const contacts = await requestLogOut();
    return contacts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const INITIAL_STATE = {
  token: null,
  user: {
    email: null,
    name: null,
  },
  isLoading: false,
  error: null,
  authenticated: false,
};

const contactDetailsSlice = createSlice({
  name: 'contactDetails',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.user = action.payload;
      })
      .addCase(logOut.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addMatcher(
        isAnyOf(
          logOut.pending,
          refreshUser.pending,
          logIn.pending,
          registration.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          logOut.rejected,
          refreshUser.rejected,
          logIn.rejected,
          registration.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
  // .addCase(fetchContacts.pending, state => {
  //   state.contacts.isLoading = true;
  //   state.contacts.error = null;
  // })
  // .addCase(fetchContacts.fulfilled, (state, action) => {
  //   state.contacts.isLoading = false;
  //   state.contacts.error = null;
  //   state.contacts.items = action.payload;
  // })
  // .addCase(fetchContacts.rejected, (state, action) => {
  //   state.contacts.isLoading = false;
  //   state.contacts.error = action.payload;
  // })
  // .addCase(addContact.pending, state => {
  //   state.contacts.isLoading = true;
  //   state.contacts.error = null;
  // })
  // .addCase(addContact.fulfilled, (state, action) => {
  //   state.contacts.isLoading = false;
  //   state.contacts.error = null;
  //   state.contacts.items.unshift(action.payload);
  // })
  // .addCase(addContact.rejected, (state, action) => {
  //   state.contacts.isLoading = false;
  //   state.contacts.error = action.payload;
  // })
  // .addCase(deleteContact.pending, state => {
  //   state.contacts.isLoading = true;
  //   state.contacts.error = null;
  // })
  // .addCase(deleteContact.fulfilled, (state, action) => {
  //   state.contacts.isLoading = false;
  //   state.contacts.error = null;
  //   state.contacts.items = state.contacts.items.filter(
  //     contact => contact.id !== action.payload.id
  //   );
  // })
  // .addCase(deleteContact.rejected, (state, action) => {
  //   state.contacts.isLoading = false;
  //   state.contacts.error = action.payload;
  // }),
});

export const contactDetailsReducer = contactDetailsSlice.reducer;
