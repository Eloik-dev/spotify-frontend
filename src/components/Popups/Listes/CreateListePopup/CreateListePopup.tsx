import { FC, useContext, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, OutlinedInput } from '@mui/material';
import styles from './CreateListePopup.module.scss'; // Adjust the path according to your project structure
import useRequest from '../../../../hooks/useRequest';
import ApiPaths from '../../../../common/ApiPaths';
import ListeContainerContext from '../../../../context/ListeContainerContext';

interface ICreateListePopupProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const CreateListePopup: FC<ICreateListePopupProps> = ({ isOpen, setIsOpen }) => {
    const { getListes } = useContext(ListeContainerContext);
    const { postRequest } = useRequest();
    const [nom, setNom] = useState('');

    /**
     * Effectue la création d'une nouvelle liste de lecture
     */
    const handleCreateListe = async () => {
        const donnees = {
            nom
        };
        await postRequest(ApiPaths.Liste.Create, donnees);

        setIsOpen(false);
        getListes();
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>{"Créer une nouvelle playlist"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer un nom pour votre nouvelle liste de lecture.
                    </DialogContentText>
                    <div className={styles['champ']}>
                        <label htmlFor="nom">Nom</label>
                        <OutlinedInput
                            type='text'
                            name='nom'
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleCreateListe} color="primary" autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateListePopup;
