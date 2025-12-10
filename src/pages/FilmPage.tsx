import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { filmSliceActions } from "../redux/slices/filmSlice/filmSlice";

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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{film.title}</h2>
            <p>ID: {film.id}</p>
            <p>{film.overview}</p>
        </div>
    );
};
