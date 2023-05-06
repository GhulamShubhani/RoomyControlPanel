import { createSlice } from "@reduxjs/toolkit";

const initialState = { current: "Properties" };

const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    current(state, action) {
      state.current = action.payload;
    },
  },
});

export const PanelActions = panelSlice.actions;

export default panelSlice.reducer;
