import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  [key: string]: any;
  salary?: [number, number];
}

const initialState: FilterState = {};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    updateSalaryFilter: (state, action: PayloadAction<[number, number]>) => {
      state.salary = action.payload;
    },
    resetFilter: () => initialState,
  },
});

export const { updateFilter, updateSalaryFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;

