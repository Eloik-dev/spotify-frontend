import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useContext } from 'react';
import UtilisateurContext from '../context/UtilisateurContext';

/**
 * Hook personnalisé pour effectuer des requêtes GET et POST en passant le token Firebase
 * @returns {[Function, Function]} Les fonctions GET et POST
 */
const useRequest = () => {
    const { utilisateur } = useContext(UtilisateurContext);

    /**
     * Effectue une requête GET avec un url
     * @param {string} url
     * @returns Le résultat ou l'erreur
     */
    const getRequest = async (url: string) => {
        try {
            const token = utilisateur?.getIdToken();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            return { result, error: null };
        } catch (err) {
            return { data: null, error: err };
        }
    };

    /**
     * Effectue une requête POST avec un url et un FormData
     * @param {string} url
     * @param {FormData} body 
     * @returns Le résultat ou l'erreur
     */
    const postRequest = async (url: string, body: FormData) => {
        try {
            const token = utilisateur?.getIdToken();
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            return { result, error: null };
        } catch (err) {
            return { data: null, error: err };
        }
    };

    return { getRequest, postRequest };
};

export default useRequest;
