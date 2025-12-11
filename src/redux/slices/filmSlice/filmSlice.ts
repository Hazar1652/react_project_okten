// src/redux/slices/filmSlice/filmSlice.ts
import type { IFilm } from "../../../models/IFilm";
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

export interface Genre {
    id: number;
    name: string;
}

interface LoadFilmsResponse {
    results: IFilm[];
    page: number;
    total_pages: number;
    total_results: number;
}

interface LoadFilmsArgs {
    page?: number;
    query?: string;
    genreId?: number | null;
}

type FilmSliceType = {
    films: IFilm[];
    film: IFilm | null;
    loadState: boolean;
    search: string;
    page: number;
    totalPages: number;
    totalResults: number;
    genres: Genre[];
    selectedGenreId: number | null;
};

const initialState: FilmSliceType = {
    films: [],
    film: null,
    loadState: false,
    search: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
    genres: [],
    selectedGenreId: null,
};

const token = import.meta.env.VITE_TMDB_READ_TOKEN;



export const loadFilms = createAsyncThunk<
    LoadFilmsResponse,
    LoadFilmsArgs,
    { rejectValue: string }
>(
    "filmsSlice/loadFilms",
    async ({ page = 1, query = "", genreId = null }, { rejectWithValue }) => {
        try {
            const trimmed = query.trim();
            let url: string;

            if (trimmed) {
                url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                    trimmed
                )}&include_adult=false&page=${page}`;
            } else {
                const params = new URLSearchParams();
                params.set("page", String(page));
                if (genreId) {
                    params.set("with_genres", String(genreId));
                }
                url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;
            }

            const res = await fetch(url, {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                return rejectWithValue(`HTTP error: ${res.status}`);
            }

            const data = await res.json();
            return {
                results: data.results as IFilm[],
                page: data.page,
                total_pages: data.total_pages,
                total_results: data.total_results,
            };
        } catch (e) {
            console.log(e);
            return rejectWithValue("Failed to load films");
        }
    }
);


export const loadFilm = createAsyncThunk<
    IFilm,
    string,
    { rejectValue: string }
>(
    "filmsSlice/loadFilm",
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
        } catch (e) {
            console.log(e);
            return rejectWithValue("Failed to load film");
        }
    }
);


export const loadGenres = createAsyncThunk<
    Genre[],
    void,
    { rejectValue: string }
>(
    "filmsSlice/loadGenres",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch(
                "https://api.themoviedb.org/3/genre/movie/list?language=en",
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

            const data = await res.json();
            return data.genres as Genre[];
        } catch (e) {
            console.log(e);
            return rejectWithValue("Failed to load genres");
        }
    }
);

export const filmSlice = createSlice({
    name: "filmsSlice",
    initialState,
    reducers: {
        changeLoadState: (state, action: PayloadAction<boolean>) => {
            state.loadState = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSelectedGenreId: (state, action: PayloadAction<number | null>) => {
            state.selectedGenreId = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(loadFilms.pending, (state) => {
                state.loadState = true;
            })
            .addCase(
                loadFilms.fulfilled,
                (state, action: PayloadAction<LoadFilmsResponse>) => {
                    state.films = action.payload.results;
                    state.page = action.payload.page;
                    state.totalPages = action.payload.total_pages;
                    state.totalResults = action.payload.total_results;
                    state.loadState = false;
                }
            )
            .addCase(loadFilms.rejected, (state, action) => {
                state.loadState = false;
                console.log("loadFilms rejected:", action.payload);
            })
            .addCase(
                loadFilm.fulfilled,
                (state, action: PayloadAction<IFilm>) => {
                    state.film = action.payload;
                }
            )
            .addCase(loadFilm.rejected, (_, action) => {
                console.log("loadFilm rejected", action.payload);
            })
            .addCase(
                loadGenres.fulfilled,
                (state, action: PayloadAction<Genre[]>) => {
                    state.genres = action.payload;
                }
            )
            .addCase(loadGenres.rejected, (_, action) => {
                console.log("loadGenres rejected:", action.payload);
            }),
});

export const filmSliceActions = {
    ...filmSlice.actions,
    loadFilms,
    loadFilm,
    loadGenres,
};

export default filmSlice.reducer;
