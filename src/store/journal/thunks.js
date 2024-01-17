import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FireStoreDB } from "../../firebase/config";
import { addNewEntryNote, deletNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imgUrls: []
        }

        const newDoc = doc( collection( FireStoreDB, `/${ uid }/journal/notes`) );
        await setDoc( newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch( addNewEntryNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }
}

export const startLoadingNotes = () => {
    
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
  
        const notes = await loadNotes(uid);

        dispatch( setNotes(notes) )

    }
};

export const startSavingNote = () => {
    
    return async( dispatch, getState ) => {

        dispatch( setSaving() )

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        
        const docRef = doc( FireStoreDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc(docRef, noteToFireStore, { merge: true});

        dispatch( updateNote( note ) );
    }
};

export const startUploadingFiles = (files = []) => {
    
    return async( dispatch ) => {

        dispatch ( setSaving ());

        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push(fileUpload( file ))
        }

        const photosUrls = await Promise.all( fileUploadPromises);
        
        dispatch(setPhotosToActiveNote( photosUrls ))
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FireStoreDB,`${uid }/journal/notes/${ note.id }`);
        const resp = await deleteDoc(docRef);

        dispatch(deletNoteById(note.id));
    }
}

