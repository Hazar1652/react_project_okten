
import type { IFilm } from "../models/IFilm";
import { MoviesListCard } from "./MoviesListCard";
import "./MoviesList.css";

interface MoviesListProps {
    movies: IFilm[];
}

export const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
    return (
        <div className="films-row">
            {movies.map((movie) => (
                <MoviesListCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};
