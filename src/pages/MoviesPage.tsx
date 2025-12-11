import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { filmSliceActions } from "../redux/slices/filmSlice/filmSlice";
import { MoviesList } from "../components/MoviesList";
import { GenreBadge } from "../components/GenreBadge";
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
        if (page > 1) {
            dispatch(filmSliceActions.setPage(page - 1));
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            dispatch(filmSliceActions.setPage(page + 1));
        }
    };

    const handleGenreClick = (id: number | null) => {
        dispatch(filmSliceActions.setSelectedGenreId(id));
        dispatch(filmSliceActions.setPage(1));
    };

    if (loadState && !films.length) {
        return <div className="movies-loader">Loading...</div>;
    }

    if (!loadState && !films.length) {
        return (
            <div className="films-page">
                <h2 className="movies-title">Trending movies</h2>

                {genres.length > 0 && (
                    <div className="films-genres">
                        <GenreBadge
                            label="All genres"
                            active={selectedGenreId === null}
                            onClick={() => handleGenreClick(null)}
                        />
                        {genres.map((g) => (
                            <GenreBadge
                                key={g.id}
                                label={g.name}
                                active={selectedGenreId === g.id}
                                onClick={() => handleGenreClick(g.id)}
                            />
                        ))}
                    </div>
                )}

                <div className="movies-empty">
                    {search.trim()
                        ? `Нічого не знайдено за запитом “${search.trim()}”`
                        : "Поки що немає фільмів 🥲"}
                </div>
            </div>
        );
    }

    const title =
        search.trim().length > 0
            ? `Results for “${search.trim()}”`
            : selectedGenreId
                ? "Movies by genre"
                : "Trending movies";

    return (
        <div className="films-page">
            <h2 className="movies-title">{title}</h2>

            {genres.length > 0 && (
                <div className="films-genres">
                    <GenreBadge
                        label="All genres"
                        active={selectedGenreId === null}
                        onClick={() => handleGenreClick(null)}
                    />
                    {genres.map((g) => (
                        <GenreBadge
                            key={g.id}
                            label={g.name}
                            active={selectedGenreId === g.id}
                            onClick={() => handleGenreClick(g.id)}
                        />
                    ))}
                </div>
            )}

            <MoviesList movies={films} />

            {totalPages > 1 && (
                <div className="films-pagination">
                    <button
                        type="button"
                        onClick={handlePrevPage}
                        disabled={page === 1}
                    >
                        ← Prev
                    </button>

                    <span className="films-pagination-info">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};
