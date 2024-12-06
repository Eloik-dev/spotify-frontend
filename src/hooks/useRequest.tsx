import { useContext } from 'react';
import UtilisateurContext from '../context/UtilisateurContext';
import settings from '../settings';

/**
 * Hook personnalisé pour effectuer des requêtes HTTP en passant le token Firebase
 * @returns {Object} Les fonctions de requête HTTP
 */
const useRequest = () => {
    const { utilisateur } = useContext(UtilisateurContext);

    /**
     * Effectue une requête HTTP avec un url, un body et une méthode
     * @param {string} url
     * @param {object} [body] 
     * @param {string} [method='GET']
     * @returns Le résultat ou l'erreur
     */
    const request = async (url: string, body?: object, method: string = 'GET') => {
        try {
            const token = await utilisateur?.getIdToken();
            const headers: HeadersInit = {
                'Authorization': `Bearer ${token}`,
            };

            // Simplement ajouter Content-Type si on a un body
            if (body) {
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(settings.ApiPath + url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            return { data, error: null };
        } catch (err) {
            return { data: null, error: err };
        }
    };

    /**
     * Effectue une requête GET avec un url
     * @param {string} url
     * @returns Le résultat ou l'erreur
     */
    const getRequest = async (url: string) => {
        return request(url, undefined, 'GET');
    };

    /**
     * Effectue une requête POST avec un url et un body
     * @param {string} url
     * @param {object} body 
     * @returns Le résultat ou l'erreur
     */
    const postRequest = async (url: string, body: object) => {
        return request(url, body, 'POST');
    };
    
    /**
     * Effectue une requête PUT avec un url et un body
     * @param {string} url
     * @param {object} body 
     * @returns Le résultat ou l'erreur
     */
    const putRequest = async (url: string, body: object) => {
        return request(url, body, 'PUT');
    };
    
    /**
     * Effectue une requête DELETE avec un url
     * @param {string} url
     * @returns Le résultat ou l'erreur
     */
    const deleteRequest = async (url: string) => {
        return request(url, undefined, 'DELETE');
    };

    return { getRequest, postRequest, putRequest, deleteRequest };
};

export default useRequest;
