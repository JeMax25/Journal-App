import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote } from '../../store/journal/thunks'


export const SideBarItem = ({note = {}}) => {

    const title = note.title.length > 16 ? note.title.substring(0,17) + '...' : note.title

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.journal);

    const openNote = () => {

        dispatch( setActiveNote({...note}) );
        
    }

  return (
    <ListItem disablePadding onClick={ openNote }>
        <ListItemButton >
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ title } />
                <ListItemText secondary={ note.body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
