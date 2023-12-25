import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../services/Api';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (params, thunkAPI) => {
    const api = Api.create();
    // const loginResponse = await api
    //   .userLoginApi(params)
    //   .then(data => data)
    //   .catch(error => thunkAPI.rejectWithValue(error?.data || error));
    // return loginResponse;
    return {};
  },
);
// export const signupUser = createAsyncThunk(
//   'auth/signupUser',
//   async (params, thunkAPI) => {
//     thunkAPI.dispatch(authSlice.actions.addUser(params));
//   },
// );

// export const signupUser = createAsyncThunk(
//   'auth/signupUser',
//   async (params, thunkAPI) => {
//     console.log('signup api called');
//     const api = Api.create();
//     const signupResponse = await api
//       .userSignupApi(params)
//       .then(data => {
//         console.log('response found: ', data);
//         return data;
//       })
//       .catch(error => {
//         console.log('Error found: ', error);
//         return thunkAPI.rejectWithValue(error?.data || error);
//       });

//     console.log('here reached');
//     return signupResponse;
//   },
// );

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: [],
    userData: '',
    loading: false,
  },
  reducers: {
    addUser: (state, payload) => {
      state.users.push(payload.payload);
    },
    logout: state => {
      state.loading = false;
    },
    resetLoader: state => {
      state.loading = false;
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(signupUser.fulfilled, (state, action) => {
  //     console.log('data received: ', action.payload);
  //     state.users.push(action.payload);
  //   });
  // },
});

export const {logout, addUser} = authSlice.actions;

export default authSlice.reducer;
