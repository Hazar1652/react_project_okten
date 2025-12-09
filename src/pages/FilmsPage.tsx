import {useEffect} from "react";
import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {filmSliceActions} from "../redux/slices/filmSlice/filmSlice.ts";


export const FilmsPage = () => {
    const {films} = useAppSelector((state) => state.filmSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(filmSliceActions.loadFilms())

    }, []);

    return (
        <div>
            {films.map((film) => (
                <div key={film.id}>{film.title}</div>
            ))}
        </div>
    );
};

//
