import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for the slice state
interface Todo {
  id: number;
  name: string;
  description: string;
}

// Define a type for the slice state
interface CounterState {
  items: Todo[];
}

// Define the initial state using that type
const initialState: CounterState = {
  items: [],
};

export const userSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (
      state,
      action: PayloadAction<{ id: number; name: string; description: string }>
    ) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in basket!`
        );
      }

      state.items = newBasket;
    },
    updateFromBasket: (state, action) => {
      state.items = { ...state.items, ...action.payload };
    },
  },
});

export const { addToBasket, removeFromBasket, updateFromBasket } =
  userSlice.actions;
export default userSlice.reducer;
