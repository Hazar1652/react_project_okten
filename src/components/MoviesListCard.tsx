
import { Link } from "react-router-dom";
import type { IFilm } from "../models/IFilm";
import { PosterPreview } from "./PosterPreview";
import { MovieInfo } from "./MovieInfo";

interface MoviesListCardProps {
    movie: IFilm;
}

export const MoviesListCard: React.FC<MoviesListCardProps> = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="film-card">
            <PosterPreview posterPath={movie.poster_path} title={movie.title} />
            <MovieInfo movie={movie} />
        </Link>
    );
};
