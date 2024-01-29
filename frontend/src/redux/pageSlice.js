import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        page: "home",
        data: {},
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
    }
});

export const { setPage, setData } = pageSlice.actions;

export default pageSlice.reducer;