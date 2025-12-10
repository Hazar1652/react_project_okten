import { useEffect } from "react";
import { Link } from "react-router-dom";
import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {filmSliceActions} from "../redux/slices/filmSlice/filmSlice.ts";


export const FilmsPage = () => {
    const dispatch = useAppDispatch();
    const { films } = useAppSelector((state) => state.filmSlice);

    useEffect(() => {
        dispatch(filmSliceActions.loadFilms());
    }, [dispatch]);

    return (
        <div>
            {films.map((film) => (
                <div key={film.id}>
                    <Link to={`/film/${film.id}`}>{film.title}</Link>
                </div>
            ))}
        </div>
    );
};
