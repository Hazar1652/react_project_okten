import type {IFilm} from "./IFilm.ts";

export interface IRequest {
    page: number;
    results: IFilm[];
    total_pages: number;
    total_results: number;
}
