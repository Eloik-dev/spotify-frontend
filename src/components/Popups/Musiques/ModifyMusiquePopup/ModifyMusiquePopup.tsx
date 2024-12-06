import { FC, useState, useEffect, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, OutlinedInput, Checkbox } from '@mui/material';
import styles from './ModifyMusiquePopup.module.scss';
import useRequest from '../../../../hooks/useRequest';
import ApiPaths from '../../../../common/ApiPaths';
import MusiqueEntity from '../../../../entities/MusiqueEntity';
import MusiqueContainerContext from '../../../../context/MusiqueContainerContext';

interface IModifyMusiquePopupProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    musique: MusiqueEntity;
}

const ModifyMusiquePopup: FC<IModifyMusiquePopupProps> = ({ isOpen, setIsOpen, musique }) => {
    const { getMusiques } = useContext(MusiqueContainerContext);
    const { putRequest } = useRequest();

    const [nom, setNom] = useState(musique.getNom());
    const [lien, setLien] = useState(musique.getLien());
    const [artistes, setArtistes] = useState(musique.getArtistes());
    const [likes, setLikes] = useState(musique.getLikes());
    const [dislikes, setDislikes] = useState(musique.getDislikes());
    const [archive, setArchive] = useState(musique.getArchive());
    const [datePublication, setDatePublication] = useState(musique.getDatePublication());

    useEffect(() => {
        setNom(musique.getNom());
        setLien(musique.getLien());
        setArtistes(musique.getArtistes());
        setLikes(musique.getLikes());
        setDislikes(musique.getDislikes());
        setArchive(musique.getArchive());
        setDatePublication(musique.getDatePublication());
    }, [musique]);

    /**
     * Effectue la mise à jour des informations de la musique
     */
    const handleUpdateMusique = async () => {
        const donnees = {
            id: musique.getId(),
            nom,
            lien,
            artistes,
            likes,
            dislikes,
            archive,
            datePublication
        };
        await putRequest(`${ApiPaths.Musiques.Update}`, donnees);

        setIsOpen(false);
        getMusiques();
    };

    return (
        <Dialog className='popup' open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>{"Modifier la musique"}</DialogTitle>
            <DialogContent className='dialog-content'>
                <DialogContentText>
                    Veuillez entrer les nouvelles informations pour cette musique.
                </DialogContentText>
                <div className={'champ'}>
                    <label htmlFor="nom">Nom</label>
                    <OutlinedInput
                        fullWidth
                        type='text'
                        name='nom'
                        placeholder="Nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="lien">Lien</label>
                    <OutlinedInput
                        fullWidth
                        type='text'
                        name='lien'
                        placeholder="Lien"
                        value={lien}
                        onChange={(e) => setLien(e.target.value)}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="artistes">Artistes</label>
                    <OutlinedInput
                        fullWidth
                        type='text'
                        name='artistes'
                        placeholder="Artistes (séparés par des virgules)"
                        value={artistes.join(', ')}
                        onChange={(e) => setArtistes(e.target.value.split(',').map(a => a.trim()))}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="likes">Likes</label>
                    <OutlinedInput
                        fullWidth
                        type='number'
                        name='likes'
                        placeholder="Likes"
                        value={likes}
                        onChange={(e) => setLikes(Number(e.target.value))}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="dislikes">Dislikes</label>
                    <OutlinedInput
                        fullWidth
                        type='number'
                        name='dislikes'
                        placeholder="Dislikes"
                        value={dislikes}
                        onChange={(e) => setDislikes(Number(e.target.value))}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="archive">Archive</label>
                    <Checkbox
                        checked={archive}
                        onChange={(e) => setArchive(e.target.checked)}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="datePublication">Date de Publication</label>
                    <OutlinedInput
                        type='date'
                        name='datePublication'
                        value={datePublication.toISOString().split('T')[0]}
                        onChange={(e) => setDatePublication(new Date(e.target.value))}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpen(false)} color="primary">
                    Annuler
                </Button>
                <Button onClick={handleUpdateMusique} color="primary" autoFocus>
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModifyMusiquePopup;
