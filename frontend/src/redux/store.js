import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import configSlice from "./configSlice";

export default configureStore({
    reducer: {
        config: configSlice,
        page: pageReducer
    },
});