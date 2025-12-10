import {useEffect} from "react";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../redux/hooks/useAppDispatch";
import {useAppSelector} from "../redux/hooks/useAppSelector";
import {filmSliceActions} from "../redux/slices/filmSlice/filmSlice";
import {GenreBadge} from "../components/GenreBadge";
import "./FilmsPage.css";


export const FilmsPage = () => {
    const dispatch = useAppDispatch();
    const {
        films,
        loadState,
        search,
        page,
        totalPages,
        genres,
        selectedGenreId,
    } = useAppSelector((state) => state.filmSlice);



    // 1) разово тягнемо жанри
    useEffect(() => {
        if (!genres.length) {
            dispatch(filmSliceActions.loadGenres());
        }
    }, [dispatch, genres.length]);

    // 2) кожна зміна page / search / genreId → новий запит на TMDB
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

    const handleGenreClick = (genreId: number | null) => {
        dispatch(filmSliceActions.setSelectedGenreId(genreId));
        dispatch(filmSliceActions.setPage(1)); // новий фільтр — з 1 сторінки
    };

    if (loadState && !films.length) {
        return <div className="films-loader">Loading...</div>;
    }

    return (
        <div className="films-page">
            <div className="films-header">


                {/* 🔥 новий рядок з жанрами */}
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
            </div>

            <div className="films-row">
                {!films.length && !loadState ? (
                    <div className="films-empty">
                        {search.trim()
                            ? `Нічого не знайдено за запитом “${search.trim()}”`
                            : "Поки що немає фільмів 🥲"}
                    </div>
                ) : (
                    films.map((film) => (
                        <Link
                            to={`/film/${film.id}`}
                            key={film.id}
                            className="film-card"
                        >
                            <div className="film-card-poster">
                                {film.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                                        alt={film.title}
                                    />
                                ) : (
                                    <div className="film-card-poster--placeholder">
                                        {film.title}
                                    </div>
                                )}
                            </div>
                            <div className="film-card-body">
                                <div className="film-card-title">{film.title}</div>
                                <div className="film-card-meta">
                                    <span>{film.release_date?.slice(0, 4) || "—"}</span>
                                    <span>★ {film.vote_average?.toFixed(1)}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>

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
