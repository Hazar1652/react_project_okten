
interface StarsRatingProps {
    rating?: number | null;
}

export const StarsRating: React.FC<StarsRatingProps> = ({ rating }) => {
    const value =
        typeof rating === "number" && !Number.isNaN(rating)
            ? rating.toFixed(1)
            : "—";

    return (
        <span className="film-card-rating">
            ★ {value}
        </span>
    );
};
