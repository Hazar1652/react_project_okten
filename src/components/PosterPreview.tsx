
interface PosterPreviewProps {
    posterPath?: string | null;
    title: string;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({
                                                                posterPath,
                                                                title,
                                                            }) => {
    return (
        <div className="film-card-poster">
            {posterPath ? (
                <img
                    src={`https://image.tmdb.org/t/p/w300${posterPath}`}
                    alt={title}
                />
            ) : (
                <div className="film-card-poster--placeholder">
                    {title}
                </div>
            )}
        </div>
    );
};
