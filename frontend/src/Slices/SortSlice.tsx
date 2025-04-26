import { createSlice } from "@reduxjs/toolkit";

export const SORT_OPTIONS = {
  RELEVANCE: "Relevance",
  MOST_RECENT: "Most Recent",
  SALARY_LOW_HIGH: "Salary (Low to High)",
  SALARY_HIGH_LOW: "Salary (High to Low)"
} as const; // Add 'as const' for type safety

const sortSlice = createSlice({
  name: 'sort',
  initialState: SORT_OPTIONS.RELEVANCE,
  reducers: {
    updateSort: (state, action) => {
      return action.payload;
    },
    resetSort: () => {
      return SORT_OPTIONS.RELEVANCE;
    }
  }
});

export const { updateSort, resetSort } = sortSlice.actions;
export default sortSlice.reducer;