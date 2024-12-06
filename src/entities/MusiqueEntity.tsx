export default class MusiqueEntity {
    private _id: string = "";
    private _nom: string = "";
    private _lien: string = "";
    private _artistes: string[] = [];
    private _likes: number = 0;
    private _dislikes: number = 0;
    private _archive: boolean = false;
    private _datePublication: Date = new Date();

    constructor(nom?: string, lien?: string, artistes?: string[], likes?: number, dislikes?: number, archive?: boolean, datePublication?: Date) {
        if (nom) this._nom = nom;
        if (lien) this._lien = lien;
        if (artistes) this._artistes = artistes;
        if (likes) this._likes = likes;
        if (dislikes) this._dislikes = dislikes;
        if (archive) this._archive = archive;
        if (datePublication) this._datePublication = datePublication;
    }

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
     * @return Le nom de la musique
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
     * GET pour le lien
     * @return Le lien de la musique
     */
    public getLien(): string {
        return this._lien;
    }

    /**
     * SET pour le lien
     * @param lien 
     * @return this
     */
    public setLien(lien: string): this {
        this._lien = lien;
        return this;
    }

    /**
     * GET pour les artistes
     * @return Les artistes de la musique
     */
    public getArtistes(): string[] {
        return this._artistes;
    }

    /**
     * SET pour les artistes
     * @param artistes 
     * @return this
     */
    public setArtistes(artistes: string[]): this {
        this._artistes = artistes;
        return this;
    }

    /**
     * GET pour les likes
     * @return Le nombre de likes
     */
    public getLikes(): number {
        return this._likes;
    }

    /**
     * SET pour les likes
     * @param likes 
     * @return this
     */
    public setLikes(likes: number): this {
        this._likes = likes;
        return this;
    }

    /**
     * GET pour les dislikes
     * @return Le nombre de dislikes
     */
    public getDislikes(): number {
        return this._dislikes;
    }

    /**
     * SET pour les dislikes
     * @param dislikes 
     * @return this
     */
    public setDislikes(dislikes: number): this {
        this._dislikes = dislikes;
        return this;
    }

    /**
     * GET pour l'archive
     * @return L'état d'archive
     */
    public getArchive(): boolean {
        return this._archive;
    }

    /**
     * SET pour l'archive
     * @param archive 
     * @return this
     */
    public setArchive(archive: boolean): this {
        this._archive = archive;
        return this;
    }

    /**
     * GET pour la date de publication
     * @return La date de publication
     */
    public getDatePublication(): Date {
        return this._datePublication;
    }

    /**
     * SET pour la date de publication
     * @param datePublication 
     * @return this
     */
    public setDatePublication(datePublication: Date): this {
        this._datePublication = datePublication;
        return this;
    }

    public static getEntity(data: any): MusiqueEntity {
        return new MusiqueEntity()
            .setId(data._id || '')
            .setNom(data.nom || '')
            .setLien(data.lien || '')
            .setArtistes(data.artistes || [])
            .setLikes(data.likes || 0)
            .setDislikes(data.dislikes || 0)
            .setArchive(data.archive || false)
            .setDatePublication(new Date(data.datePublication || Date.now()));
    };
}
