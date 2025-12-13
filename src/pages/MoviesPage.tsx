import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { filmSliceActions } from "../redux/slices/filmSlice/filmSlice";
import { MoviesList } from "../components/MoviesList";
import { GenresFilter } from "../components/GenresFilter";
import "./MoviesPage.css";

export const MoviesPage = () => {
    const dispatch = useAppDispatch();


    const {
        films,
        loadState,
        search,
        page,
        totalPages,
        genres,
        selectedGenreId,
    } = useAppSelector((s) => s.filmSlice);

    useEffect(() => {
        if (!genres.length) {
            dispatch(filmSliceActions.loadGenres());
        }
    }, [dispatch, genres.length]);

    useEffect(() => {
        dispatch(
            filmSliceActions.loadFilms({
                page,
                query: search,
                genreId: selectedGenreId,
            })
        );
    }, [dispatch, page, search, selectedGenreId]);

    const handlePrevPage = () => {
        if (page > 1) dispatch(filmSliceActions.setPage(page - 1));
    };

    const handleNextPage = () => {
        if (page < totalPages) dispatch(filmSliceActions.setPage(page + 1));
    };

    if (loadState && !films.length) {
        return <div className="movies-loader">Loading...</div>;
    }

    const title =
        search.trim().length > 0
            ? `Results for “${search.trim()}”`
            : selectedGenreId
                ? "Movies by genre"
                : "Trending movies";

    return (
        <div className="films-page">
            <div className="films-header">
                <h2 className="movies-title">{title}</h2>
                <GenresFilter />
            </div>

            {/* CONTENT */}
            {!films.length && !loadState ? (
                <div className="movies-empty">
                    {search.trim()
                        ? `Нічого не знайдено за запитом “${search.trim()}”`
                        : "Поки що немає фільмів 🥲"}
                </div>
            ) : (
                <MoviesList movies={films} />
            )}

            {totalPages > 1 && (
                <div className="films-pagination">
                    <button onClick={handlePrevPage} disabled={page === 1}>
                        ← Prev
                    </button>

                    <span className="films-pagination-info">
                        Page {page} of {totalPages}
                    </span>

                    <button onClick={handleNextPage} disabled={page === totalPages}>
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};