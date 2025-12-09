import {configureStore} from "@reduxjs/toolkit";
import {filmSlice} from "../slices/filmSlice/filmSlice.ts";

export const store = configureStore({
    reducer: {
        filmSlice: filmSlice.reducer,
        // genreSlice:null,
    }
});