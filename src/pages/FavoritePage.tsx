import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import "./FavoritesPage.css";

export const FavoritesPage = () => {
    const favorites = useAppSelector((state) => state.favoritesSlice.items);

    return (
        <div className="favorites-page">
            <h1 className="favorites-title">⭐ My Favorite Movies</h1>

            {favorites.length === 0 ? (
                <p className="favorites-empty">
                    У вас ще немає улюблених фільмів 😢
                    <br />
                    <Link to="/" className="favorites-back">
                        ← Повернутись на головну
                    </Link>
                </p>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((film) => (
                        <Link
                            to={`/movie/${film.id}`}
                            key={film.id}
                            className="favorite-card"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                alt={film.title}
                            />
                            <div className="favorite-card-info">
                                <h3>{film.title}</h3>
                                <span>★ {film.vote_average?.toFixed(1)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
