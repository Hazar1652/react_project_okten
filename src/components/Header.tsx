
import type { ChangeEvent } from "react";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { filmSliceActions } from "../redux/slices/filmSlice/filmSlice";
import { UserInfo } from "./UserInfo";
import "./Header.css";

export const Header = () => {
    const dispatch = useAppDispatch();
    const { search } = useAppSelector((s) => s.filmSlice);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(filmSliceActions.setSearch(value));
        dispatch(filmSliceActions.setPage(1));
    };

    return (
        <header className="topbar">
            <div className="topbar-left">

            </div>

            <div className="topbar-search">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="topbar-right">
                <UserInfo />
            </div>
        </header>
    );
};
