import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkApi) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload, thunkApi) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload);
      console.log(res)
      const login = await axios(`${BASE_URL}/auth/profile`, {
        headers: {
          "Authorization": `Bearer ${res.data.access_token}`
        }
      });
      return login.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload, thunkApi) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const addCurrentUser =  (state, action) => {
  state.currentUser = action.payload;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: 'signup',
    showForm: false
  },
  reducers: {
    addItemToCart: (state, {payload})=>{
        let newCart = [...state.cart]
        const found = state.cart.find(({id}) => id === payload.id)
        if(found){
          newCart = newCart.map(item => {
            return item.id === payload.id? {...item,quantity: 
            payload.quantity || item.quantity+1 } : item
          })  
        }else {
            newCart.push({...payload, quantity: 1})
        }
        state.cart = newCart
    },
    toggleForm: (state, {payload}) => {
      state.showForm = payload
    },
    toggleFormType: (state, {payload}) => {
      state.formType = payload
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getCategories.pending, (state) => {
    //   state.isLoading = true;
    // });
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateUser.fulfilled, addCurrentUser);
    // builder.addCase(getCategories.rejected, (state, action) => {
    //     console.log(state)
    //     state.isLoading = false;
    //   });
  },
});

export const {addItemToCart,toggleForm,toggleFormType} = userSlice.actions

export default userSlice.reducer;