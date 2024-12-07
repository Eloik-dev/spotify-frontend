import { FC, useState, useEffect, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, OutlinedInput, Checkbox } from '@mui/material';
import useRequest from '../../../hooks/useRequest';
import ApiPaths from '../../../common/ApiPaths';
import MusiqueEntity from '../../../entities/MusiqueEntity';
import MusiqueContainerContext from '../../../context/MusiqueContainerContext';
import { FormattedMessage, useIntl } from 'react-intl';

interface IModifyMusiquePopupProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    musique: MusiqueEntity;
}

const ModifyMusiquePopup: FC<IModifyMusiquePopupProps> = ({ isOpen, setIsOpen, musique }) => {
    const intl = useIntl();
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
                    <FormattedMessage id="modifyMusiquePopup.title" />
                </DialogContentText>
                <div className={'champ'}>
                    <label htmlFor="nom">
                        <FormattedMessage id="terms.name" />
                    </label>
                    <OutlinedInput
                        fullWidth
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
                        fullWidth
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
                        fullWidth
                        type='text'
                        name='artistes'
                        placeholder={intl.formatMessage({ id: 'terms.artists' })}
                        value={artistes.join(', ')}
                        onChange={(e) => setArtistes(e.target.value.split(',').map(a => a.trim()))}
                    />
                </div>
                <div className={'champ'}>
                    <label htmlFor="likes">
                        <FormattedMessage id="terms.likes" />
                    </label>
                    <OutlinedInput
                        fullWidth
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
                        fullWidth
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
                <Button onClick={handleUpdateMusique} color="primary" autoFocus>
                    <FormattedMessage id="terms.confirm" />
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModifyMusiquePopup;
