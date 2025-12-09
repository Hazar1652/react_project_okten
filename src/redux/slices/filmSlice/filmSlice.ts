import type {IFilm} from "../../../models/IFilm.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";

type FilmSliceType = {
    films: IFilm[]
}
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzEzMjJkMWQ1MjIyMDQ2YjE3M2ZiYTY2ZWM2MjExYSIsIm5iZiI6MTc2NDU4OTgwNi45NjEsInN1YiI6IjY5MmQ4MGVlZDY0YzBkMzEwNjM5OGMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3pOzvrT8yKlE7hpoMyiAW_RgEKUFFj-21N1bSC3RPqE";


export const loadFilms = createAsyncThunk(
    "loadSlice/loadFilms",
    async (_, thunkAPI) => {
        try {
            const {results} = await fetch(
                "https://api.themoviedb.org/3/discover/movie",
                {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((value) => value.json());
            return thunkAPI.fulfillWithValue(results)
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }


    }
);
const initialState: FilmSliceType = {films: []};
export const filmSlice = createSlice({
    name: "filmsSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadFilms.fulfilled, (state, action: PayloadAction<IFilm[]>) => {
            state.films = action.payload
        })
            .addCase(loadFilms.rejected, (state, action) => {
                console.log(state)
                console.log(action)
            })
})

export const filmSliceActions = {
    ...filmSlice.actions, loadFilms
}