import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        baseUrl: "http://192.168.6.190:8080",
        authToken: "",
        isAuth: false
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        }
    }
});

export const { setAuthToken, setIsAuth } = configSlice.actions;

export default configSlice.reducer;