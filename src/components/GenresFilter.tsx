import { useState } from "react";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { filmSliceActions } from "../redux/slices/filmSlice/filmSlice";
import { GenreBadge } from "./GenreBadge"; // Перевір, чи правильний шлях

export const GenresFilter = () => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);


    const { genres, selectedGenreId } = useAppSelector((s) => s.filmSlice);

    if (!genres || genres.length === 0) {
        return null;
    }

    const handleGenreClick = (id: number | null) => {
        dispatch(filmSliceActions.setSelectedGenreId(id));
        dispatch(filmSliceActions.setPage(1));
        setIsOpen(false);
    };

    return (
        <div className="genres-wrapper">
            <button
                className={`genres-burger ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                ☰ Genres
            </button>

            {isOpen && (
                <>
                    <div
                        style={{ position: "fixed", inset: 0, zIndex: 99 }}
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="genres-dropdown">
                        <GenreBadge
                            label="All genres"
                            active={selectedGenreId === null}
                            onClick={() => handleGenreClick(null)}
                        />

                        {genres.map((g) => (
                            <GenreBadge
                                key={g.id}
                                label={g.name}
                                active={selectedGenreId === g.id}
                                onClick={() => handleGenreClick(g.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};