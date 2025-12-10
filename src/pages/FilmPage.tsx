// src/pages/FilmPage.tsx
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { filmSliceActions } from "../redux/slices/filmSlice/filmSlice";
import "./FilmPage.css";

export const FilmPage = () => {
    const { id } = useParams();
    const numericId = Number(id);
    const dispatch = useAppDispatch();
    const { film, loadState } = useAppSelector((state) => state.filmSlice);

    useEffect(() => {
        if (!id) return;

        dispatch(filmSliceActions.changeLoadState(true));

        dispatch(filmSliceActions.loadFilm(id))
            .unwrap()
            .finally(() => {
                dispatch(filmSliceActions.changeLoadState(false));
            });
    }, [id, dispatch]);

    if (loadState || !film || film.id !== numericId) {
        return (
            <div className="film-page film-page--loading">
                <div className="film-page-loader">Loading...</div>
            </div>
        );
    }

    const backdropUrl = film.backdrop_path
        ? `https://image.tmdb.org/t/p/original${film.backdrop_path}`
        : film.poster_path
            ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
            : undefined;

    const posterUrl = film.poster_path
        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
        : undefined;

    const year = film.release_date ? film.release_date.slice(0, 4) : "—";
    const rating = film.vote_average ? film.vote_average.toFixed(1) : "—";
    const votes = film.vote_count ?? 0;
    const lang = film.original_language
        ? film.original_language.toUpperCase()
        : "—";

    // genres і runtime приходять з /movie/:id
    // якщо TS свариться — додай їх як optional у IFilm
    const genres = (film as any).genres as { id: number; name: string }[] | undefined;
    const runtime = (film as any).runtime as number | undefined;
    const tagline = (film as any).tagline as string | undefined;

    const runtimeLabel =
        runtime && runtime > 0
            ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
            : null;

    return (
        <div className="film-page">
            <div
                className="film-hero"
                style={
                    backdropUrl
                        ? {
                            backgroundImage: `linear-gradient(to right, rgba(5,9,12,0.92), rgba(5,9,12,0.75)), url(${backdropUrl})`,
                        }
                        : undefined
                }
            >
                <div className="film-hero-content">
                    <div className="film-poster-wrapper">
                        {posterUrl ? (
                            <img src={posterUrl} alt={film.title} />
                        ) : (
                            <div className="film-poster-placeholder">
                                {film.title}
                            </div>
                        )}
                    </div>

                    <div className="film-info">
                        <div className="film-info-top">
                            <div className="film-badge-row">
                                <span className="film-badge">Movie</span>
                                {year !== "—" && (
                                    <span className="film-badge">{year}</span>
                                )}
                                {runtimeLabel && (
                                    <span className="film-badge">
                                        {runtimeLabel}
                                    </span>
                                )}
                                <span className="film-badge">
                                    Lang: {lang}
                                </span>
                            </div>

                            <h1 className="film-title">{film.title}</h1>
                            {tagline && (
                                <p className="film-tagline">“{tagline}”</p>
                            )}
                        </div>

                        <div className="film-rating-row">
                            <div className="film-rating-main">
                                <span className="film-rating-star">★</span>
                                <span className="film-rating-score">
                                    {rating}
                                </span>
                                <span className="film-rating-votes">
                                    {votes.toLocaleString()} votes
                                </span>
                            </div>

                            {genres && genres.length > 0 && (
                                <div className="film-genres">
                                    {genres.map((g) => (
                                        <span
                                            key={g.id}
                                            className="film-genre-chip"
                                        >
                                            {g.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <p className="film-overview">{film.overview}</p>

                        <div className="film-extra-grid">
                            <div className="film-extra-item">
                                <span className="film-extra-label">
                                    Original title
                                </span>
                                <span className="film-extra-value">
                                    {film.original_title || film.title}
                                </span>
                            </div>
                            <div className="film-extra-item">
                                <span className="film-extra-label">
                                    Popularity
                                </span>
                                <span className="film-extra-value">
                                    {film.popularity?.toFixed(0) ?? "—"}
                                </span>
                            </div>
                            <div className="film-extra-item">
                                <span className="film-extra-label">
                                    Adult
                                </span>
                                <span className="film-extra-value">
                                    {film.adult ? "18+" : "Family / 16+"}
                                </span>
                            </div>
                        </div>

                        <div className="film-actions">
                            <button className="film-btn film-btn--primary">
                                ▶ Watch trailer
                            </button>
                            <button className="film-btn film-btn--secondary">
                                + Add to favorites
                            </button>
                            <Link to="/" className="film-back-link">
                                ← Back to home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
