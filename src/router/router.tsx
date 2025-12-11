// src/router/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

import { MoviePage } from "../pages/MoviePage.tsx";
import {MoviesPage} from "../pages/MoviesPage.tsx";
import {FavoritesPage} from "../pages/FavoritePage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <MoviesPage />,
            },
            {
                path: "movie/:id",
                element: <MoviePage />,
            },
            {
                path:"favorites",
                element: <FavoritesPage/>
            }
        ],
    },
]);
