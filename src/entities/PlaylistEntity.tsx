import MusiqueEntity from "./MusiqueEntity";

export default class PlaylistEntity {
    private _nom: string = '';
    private _musiques: MusiqueEntity[] = [];

    constructor() { }

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
     * SET pour les musiques 
     * @param musiques 
     * @return this
     */
    public setMusiques(musiques: MusiqueEntity[]): this {
        this._musiques = musiques;
        return this;
    }
}
