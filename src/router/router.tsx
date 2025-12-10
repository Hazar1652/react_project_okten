import {MainLayout} from "../layouts/MainLayout.tsx";
import { FilmPage } from "../pages/FilmPage.tsx";
import {FilmsPage} from "../pages/FilmsPage.tsx";
import {FavoritesPage} from "../pages/FavoritesPage.tsx";
import {createBrowserRouter, type RouteObject} from "react-router-dom";

const routes: RouteObject[] =[
    {
        path: '', element: <MainLayout/>, children: [
            {path:'home', element:<FilmsPage/>},
            {path:'film/:id', element:<FilmPage/>},
            {path:'films', element:<FavoritesPage/>},
        ]
    }
];
export const router = createBrowserRouter(routes)