import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Login from './views/Login/Login';

/**
 * Cette vue affichera le contenu d'une liste de lecture sélectionnée
 * Si aucune liste n'est sélectionnée, toutes les musiques seront affichées 
 */
export default function Router() {
    /**
     * Créer les routes pour la connexion, la page d'accueil et la page de la liste de lecture
     */
    const routes = useMemo(() => {
        return [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/listes/:id',
                element: <Home />
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