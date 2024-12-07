import MusiqueEntity from "./MusiqueEntity";

export default class ListeEntity {
    private _id: string = '';
    private _nom: string = '';
    private _musiques: MusiqueEntity[] = [];

    constructor() { }

    /**
     * GET pour le id MongoDB
     * @return L'id de la liste de lecture
     */
    public getId(): string {
        return this._id;
    }

    /**
     * SET pour le id MongoDB
     * @param id Le id de la liste de lecture
     */
    private setId(id: string): this {
        this._id = id;
        return this;
    }

    /**
     * GET pour le nom
     * @return Le nom de la liste de lecture
     */
    public getNom(): string {
        return this._nom;
    }

    /**
     * SET pour le nom 
     * @param nom 
     * @return this
     */
    public setNom(nom: string): this {
        this._nom = nom;
        return this;
    }

    /**
     * GET pour les musiques
     * @return Les musiques de la liste de lecture 
     */
    public getMusiques(): MusiqueEntity[] {
        return this._musiques;
    }

    /**
     * GET pour le nombre de musiques
     * @return Le nombre de musiques 
     */
    public getNbMusiques(): number {
        return this.getMusiques().length;
    }

    /**
     * SET pour les musiques 
     * @param musiques 
     * @return this
     */
    public setMusiques(musiques: MusiqueEntity[]): this {
        this._musiques = musiques;
        return this;
    }

    /**
     * Convertit les données JSON en instance de ListeEntity
     * @param data
     * @return ListeEntity
     */
    public static toEntity(data: any): ListeEntity {
        const listeEntity = new ListeEntity()
            .setId(data._id || '')
            .setNom(data.nom || '');

        // Set the musiques
        if (Array.isArray(data.musiques)) {
            const musiques = data.musiques.map((musiqueData: any) => {
                return MusiqueEntity.toEntity(musiqueData)
            });
            listeEntity.setMusiques(musiques);
        }

        return listeEntity;
    }
}
