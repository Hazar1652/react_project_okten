// src/components/Header.tsx (або де він лежить)
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { filmSliceActions } from "../redux/slices/filmSlice/filmSlice";
import "./Header.css";
import type { ChangeEvent } from "react";

export const Header = () => {
    const dispatch = useAppDispatch();
    const { search } = useAppSelector((s) => s.filmSlice);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(filmSliceActions.setSearch(e.target.value));
    };

    return (
        <header className="topbar">
            <div className="topbar-search">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
        </header>
    );
};
