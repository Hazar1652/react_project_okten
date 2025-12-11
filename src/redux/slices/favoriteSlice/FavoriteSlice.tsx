import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface FavoriteFilm {
    id: number;
    title: string;
    poster_path?: string;
    vote_average?: number;
}

interface FavoritesState {
    items: FavoriteFilm[];
}

const initialState: FavoritesState = {
    items: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<FavoriteFilm>) {
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
