import {configureStore} from "@reduxjs/toolkit";
import {filmSlice} from "../slices/filmSlice/filmSlice.ts";
import {favoritesSlice} from "../slices/favoriteSlice/FavoriteSlice.tsx";

export const store = configureStore({
    reducer: {
        filmSlice: filmSlice.reducer,
        favoritesSlice: favoritesSlice.reducer,
    }
});