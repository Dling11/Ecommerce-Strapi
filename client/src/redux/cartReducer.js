import { createSlice } from '@reduxjs/toolkit'

const initialState = {  // store products if add to cart
  products: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {   // the term action means do something || if this is used
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;     //determined how much quantity is in the cart
      } else {
        state.products.push(action.payload);      // very crucial to return or push the action.payload
      }
    },
    removeItem: (state,action) => {
      state.products = state.products.filter(item => item.id !== action.payload)  // return all except the current id || filter :D
    },
    resetCart: (state) => {
      state.products = []       // just to make your cart empty
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;