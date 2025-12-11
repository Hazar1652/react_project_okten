
export interface IGenre {
    id: number;
    name: string;
}

export interface IFilm {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    vote_average: number;
    vote_count: number;
    release_date?: string;
    original_title?: string;
    popularity?: number;
    adult?: boolean;
    original_language?: string;
    genres?: IGenre[];
    runtime?: number;
    tagline?: string;
}
