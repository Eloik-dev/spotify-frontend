export default {
    Liste: {
        GetAll: '/api/listes',
        Get: '/api/listes',
        Search: '/api/listes/search',
        Create: '/api/listes/create',
        Update: '/api/listes/update',
        Delete: '/api/listes/delete',
    },
    Musiques: {
        Search: '/api/musiques/search',
        Create: '/api/musiques/create',
        Update: '/api/musiques/update',
        Delete: '/api/musiques/delete',
    },
} as const;
