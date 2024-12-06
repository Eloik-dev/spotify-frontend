import { FC, useState, useEffect, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, OutlinedInput } from '@mui/material';
import styles from './ModifyListePopup.module.scss'; // Adjust the path according to your project structure
import useRequest from '../../../../hooks/useRequest';
import ApiPaths from '../../../../common/ApiPaths';
import ListeContainerContext from '../../../../context/ListeContainerContext';

interface IModifyListePopupProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    listeId: string;
    initialNom: string;
}

const ModifyListePopup: FC<IModifyListePopupProps> = ({ isOpen, setIsOpen, listeId, initialNom }) => {
    const { getListes } = useContext(ListeContainerContext);
    const { putRequest } = useRequest();
    const [nom, setNom] = useState(initialNom);

    useEffect(() => {
        setNom(initialNom);
    }, [initialNom]);

    /**
     * Effectue la mise à jour du nom de la liste de lecture
     */
    const handleUpdateListe = async () => {
        const donnees = { id: listeId, nom };
        await putRequest(ApiPaths.Liste.Update, donnees);

        setIsOpen(false);
        getListes();
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>{"Modifier le nom de la liste"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer un nouveau nom pour votre liste de lecture.
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
                    <Button onClick={handleUpdateListe} color="primary" autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModifyListePopup;
