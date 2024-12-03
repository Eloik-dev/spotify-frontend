import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './views/Layout/Layout';
import Login from './views/Authentication/Login';
import Register from './views/Authentication/Register';

/**
 * Cette vue affichera le contenu d'une liste de lecture sélectionnée
 * Si aucune liste n'est sélectionnée, toutes les musiques seront affichées 
 */
export default function Router() {
    /**
     * Create routes for login, register and /
     */
    const routes = useMemo(() => {
        return [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/',
                element: <Layout />
            }
        ]
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}