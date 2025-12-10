// src/router/router.tsx
import {createBrowserRouter, type RouteObject} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout";
import {FilmsPage} from "../pages/FilmsPage";
import {FilmPage} from "../pages/FilmPage";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <FilmsPage /> },
            { path: "films", element: <FilmsPage /> },
            { path: "film/:id", element: <FilmPage /> },

        ],
    },
];

export const router = createBrowserRouter(routes);
