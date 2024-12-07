import { FC, useContext, useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, OutlinedInput } from '@mui/material';
import useRequest from '../../../hooks/useRequest';
import ApiPaths from '../../../common/ApiPaths';
import MusiqueContainerContext from '../../../context/MusiqueContainerContext';
import { FormattedMessage, useIntl } from 'react-intl';

interface ICreateMusiquePopupProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const CreateMusiquePopup: FC<ICreateMusiquePopupProps> = ({ isOpen, setIsOpen }) => {
    const intl = useIntl();
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
                    <FormattedMessage id="createMusiquePopup.title" />
                </DialogContentText>
                <div className={'champ'}>
                    <label htmlFor="nom">
                        <FormattedMessage id="terms.name" />
                    </label>
                    <OutlinedInput
                        type='text'
                        name='nom'
                        placeholder={intl.formatMessage({ id: 'terms.name' })}
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="lien">
                        <FormattedMessage id="terms.link" />
                    </label>
                    <OutlinedInput
                        type='text'
                        name='lien'
                        placeholder={intl.formatMessage({ id: 'terms.link' })}
                        value={lien}
                        onChange={(e) => setLien(e.target.value)}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="artistes">
                        <FormattedMessage id="terms.artists" />
                    </label>
                    <OutlinedInput
                        type='text'
                        name='artistes'
                        placeholder={intl.formatMessage({ id: 'terms.artists' })}
                        value={artistes.join(', ')}
                        onChange={(e) => setArtistes(e.target.value.split(',').map(a => a.trim()))}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="likes">
                        <FormattedMessage id="terms.artists" />
                    </label>
                    <OutlinedInput
                        type='number'
                        name='likes'
                        placeholder={intl.formatMessage({ id: 'terms.likes' })}
                        value={likes}
                        onChange={(e) => setLikes(Number(e.target.value))}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="dislikes">
                        <FormattedMessage id="terms.dislikes" />
                    </label>
                    <OutlinedInput
                        type='number'
                        name='dislikes'
                        placeholder={intl.formatMessage({ id: 'terms.dislikes' })}
                        value={dislikes}
                        onChange={(e) => setDislikes(Number(e.target.value))}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="archive">
                        <FormattedMessage id="terms.archive" />
                    </label>
                    <Checkbox
                        name='archive'
                        checked={archive}
                        onChange={(e) => setArchive(e.target.checked)}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="datePublication">
                        <FormattedMessage id="terms.date" />
                    </label>
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
                    <FormattedMessage id="terms.cancel" />
                </Button>
                <Button onClick={handleCreateMusique} color="primary" autoFocus>
                    <FormattedMessage id="terms.confirm" />
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateMusiquePopup;