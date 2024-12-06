import { FC, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useRequest from '../../../hooks/useRequest';
import ListeContainerContext from '../../../context/ListeContainerContext';

interface IDeletePopup {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    url: string;
    id: string;
    message: string;
}

const DeletePopup: FC<IDeletePopup> = ({ isOpen, setIsOpen, url, id, message }) => {
    const { getListes } = useContext(ListeContainerContext);
    const { deleteRequest } = useRequest();

    /**
     * Effectue la suppression de l'entité
     */
    const handleDeleteEntity = async () => {
        await deleteRequest(`${url}/${id}`);

        setIsOpen(false);
        getListes();
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>{`Suppression`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(false)} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleDeleteEntity} color="primary" autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeletePopup;
