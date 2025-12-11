import "./GenreBadge.css";

interface GenreBadgeProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
}

export const GenreBadge: React.FC<GenreBadgeProps> = ({
                                                          label,
                                                          active = false,
                                                          onClick,
                                                      }) => {
    return (
        <button
            type="button"
            className={
                "genre-badge" + (active ? " genre-badge--active" : "")
            }
            onClick={onClick}
        >
            {label}
        </button>
    );
};
