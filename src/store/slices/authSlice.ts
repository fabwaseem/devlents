import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "next-auth";

const initialState: User = {
  id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuth: (state: User, action: PayloadAction<User>) => {
      state = action.payload;
    },
  },
});

export const { updateAuth } = authSlice.actions;
export default authSlice.reducer;
