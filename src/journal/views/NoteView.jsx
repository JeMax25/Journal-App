import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal/thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

    const dispatch = useDispatch();
    const {isSaving} = useSelector( state => state.auth)

    const { active:note , saveMessage } = useSelector( state => state.journal);

    const { body,title,date,onInputChange,formState } = useForm( note );

    const fileInputRef = useRef();

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    })

    const changeForm = (form) => {
        onInputChange(form)
    }

    useEffect(() => {
      dispatch( setActiveNote(formState) )
    }, [formState]);

    useEffect(() => {
        if ( saveMessage.length > 0 ){
            Swal.fire('Nota actualizada', saveMessage, 'success')
        }
      }, [saveMessage]);

    const onSaveNote = () => {

        dispatch( startSavingNote() );

    }

    const onFileInputChange = ({target}) => {
        if(target.files === 0)return;

        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch( startDeletingNote());
    }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>
        <Grid item>

            <input
                ref={ fileInputRef } 
                type='file' 
                multiple 
                onChange={onFileInputChange}
                style={{display: 'none'}}></input>

            <IconButton
                color='primary'
                disabled= {isSaving}
                onClick={ () => fileInputRef.current.click()}>
                <UploadOutlined></UploadOutlined>
            </IconButton>

            <Button
                onClick={ onSaveNote }    
                color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name='title'
                value={ title }
                onChange={ changeForm }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name='body'
                value={ body }
                onChange={ changeForm }
            />
        </Grid>

        <Grid container justifyContent={'end'}>
            <Button
                onClick={onDelete}
                sx={{mt: 2}}
                color='error'
            >
                <DeleteOutline></DeleteOutline>
                Borrar
            </Button>
        </Grid>

        {/* Image gallery */}
        <ImageGallery
            images={note.imgUrls}
        />

    </Grid>
  )
}
