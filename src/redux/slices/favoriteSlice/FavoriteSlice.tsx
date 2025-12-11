import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IFavoriteFilm} from "../../../models/IFavoriteFilm.ts";



interface FavoritesState {
    items: IFavoriteFilm[];
}

const initialState: FavoritesState = {
    items: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<IFavoriteFilm>) {
            const exists = state.items.find(f => f.id === action.payload.id);

            if (exists) {

                state.items = state.items.filter(f => f.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }

            localStorage.setItem("favorites", JSON.stringify(state.items));
        },
    },
});

export const favoritesActions = favoritesSlice.actions;
export default favoritesSlice.reducer;
