export default {
    Playlists: {
        GetAll: '/api/playlists',
        GetOne: '/api/playlists/:id',
        Add: '/api/playlists/add',
        Update: '/api/playlists/update',
        Delete: '/api/playlists/delete/:id',
    },
    Musiques: {
        Add: '/api/musiques/add',
        Update: '/api/musiques/update',
        Delete: '/api/musiques/delete/:id',
    },
} as const;

/**
 * Playlist
 *  - Retrouver toutes les playlists
 *  - Retrouver une playlist
 *  - Ajouter une playlist
 *  - Supprimer une playlist
 * 
 * Musique
 *  - Ajouter une musique pour une playlist
 *  - Modifier une musique pour une playlist
 *  - Supprimer une musique d'une playlist
 */