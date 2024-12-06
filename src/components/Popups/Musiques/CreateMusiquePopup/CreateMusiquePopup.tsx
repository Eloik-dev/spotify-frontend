import { FC, useContext, useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, OutlinedInput } from '@mui/material';
import useRequest from '../../../../hooks/useRequest';
import ApiPaths from '../../../../common/ApiPaths';
import MusiqueContainerContext from '../../../../context/MusiqueContainerContext';

interface ICreateMusiquePopupProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const CreateMusiquePopup: FC<ICreateMusiquePopupProps> = ({ isOpen, setIsOpen }) => {
    const liste_id = window.location.pathname.split('/')[2];
    const { getMusiques } = useContext(MusiqueContainerContext);
    const { postRequest } = useRequest();

    const [nom, setNom] = useState('');
    const [lien, setLien] = useState('');
    const [artistes, setArtistes] = useState<string[]>([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [archive, setArchive] = useState(false);
    const [datePublication, setDatePublication] = useState<Date>(new Date());

    /**
     * Effectue la création d'une nouvelle musique
     */
    const handleCreateMusique = async () => {
        const donnees = {
            liste_id,
            nom,
            lien,
            artistes,
            likes,
            dislikes,
            archive,
            datePublication
        };
        await postRequest(ApiPaths.Musiques.Create, donnees);

        setIsOpen(false);
        getMusiques();
    }

    return (
        <Dialog className='popup' open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>{"Créer une nouvelle musique"}</DialogTitle>
            <DialogContent className='dialog-content'>
                <DialogContentText>
                    Veuillez entrer les détails de la nouvelle musique.
                </DialogContentText>
                <div className={'champ'}>
                    <label htmlFor="nom">Nom</label>
                    <OutlinedInput
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
                        name='archive'
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
                <Button onClick={handleCreateMusique} color="primary" autoFocus>
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateMusiquePopup;