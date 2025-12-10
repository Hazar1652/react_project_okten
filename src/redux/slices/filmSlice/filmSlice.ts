import type { IFilm } from "../../../models/IFilm.ts";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FilmSliceType = {
    films: IFilm[];
    film: IFilm | null;
    loadState: boolean;
};

const initialState: FilmSliceType = {
    films: [],
    film: null,
    loadState: false,
};

const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzEzMjJkMWQ1MjIyMDQ2YjE3M2ZiYTY2ZWM2MjExYSIsIm5iZiI6MTc2NDU4OTgwNi45NjEsInN1YiI6IjY5MmQ4MGVlZDY0YzBkMzEwNjM5OGMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3pOzvrT8yKlE7hpoMyiAW_RgEKUFFj-21N1bSC3RPqE";



export const loadFilms = createAsyncThunk<
    IFilm[],
    void,
    { rejectValue: string }
>(
    "loadSlice/loadFilms",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(
                "https://api.themoviedb.org/3/discover/movie",
                {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                return rejectWithValue(`HTTP error: ${res.status}`);
            }

            const data = await res.json(); // { page, results, ... }
            return data.results as IFilm[];
        } catch (error) {
            console.log(error);
            return rejectWithValue("Failed to load films");
        }
    }
);


export const loadFilm = createAsyncThunk<
    IFilm,
    string,
    { rejectValue: string }
>(
    "loadSlice/loadFilm",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${id}`,
                {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                return rejectWithValue(`HTTP error: ${res.status}`);
            }

            const film = await res.json();
            return film as IFilm;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Failed to load film");
        }
    }
);


export const filmSlice = createSlice({
    name: "filmsSlice",
    initialState,
    reducers: {
        changeLoadState: (state, action:PayloadAction<boolean>)=>{
            state.loadState = action.payload;
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadFilms.fulfilled, (state, action: PayloadAction<IFilm[]>) => {
                state.films = action.payload;
            })
            .addCase(loadFilms.rejected, (_, action) => {
                console.log("loadFilms rejected:", action.payload);
            })
            .addCase(loadFilm.fulfilled, (state, action: PayloadAction<IFilm>) => {
                state.film = action.payload;
            })
            .addCase(loadFilm.rejected, (_, action) => {
                console.log("loadFilm rejected", action.payload);
            })
});



export const filmSliceActions = {
    ...filmSlice.actions,
    loadFilms,
    loadFilm,
};
