import type {IFilm} from "../models/IFilm";
import {StarsRating} from "./StarsRating";

interface MovieInfoProps {
    movie: IFilm;
}

export const MovieInfo: React.FC<MovieInfoProps> = ({movie}) => {
    const year = movie.release_date?.slice(0, 4) ?? "—";

    return (
        <div className="film-card-body">
            <div className="film-card-title">{movie.title}</div>
            <div className="film-card-meta">
                <span>{year}</span>
                <StarsRating rating={movie.vote_average}/>
            </div>
        </div>
    );
};
