import { FC, useContext, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, OutlinedInput } from '@mui/material';
import useRequest from '../../../../hooks/useRequest';
import ApiPaths from '../../../../common/ApiPaths';
import ListeContainerContext from '../../../../context/ListeContainerContext';
import { FormattedMessage } from 'react-intl';

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
        <Dialog className='popup' open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>{"Créer une nouvelle playlist"}</DialogTitle>
            <DialogContent className='dialog-content'>
                <DialogContentText>
                    <FormattedMessage id="createListePopup.title" />
                </DialogContentText>
                <div className={'champ'}>
                    <label htmlFor="nom">
                        <FormattedMessage id="terms.name" />
                    </label>
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
                    <FormattedMessage id="terms.cancel" />
                </Button>
                <Button onClick={handleCreateListe} color="primary" autoFocus>
                    <FormattedMessage id="terms.confirm" />
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateListePopup;
