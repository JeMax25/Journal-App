import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        saveMessage: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imgUrls: [],
        // },

    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEntryNote: (state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action ) => {
            state.active = action.payload;
            state.saveMessage = '';
        },
        setNotes: (state, action ) => {
            state.notes = action.payload
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.saveMessage = '';
            
        },
        updateNote: (state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if( note.id === action.payload.id){
                    return note = action.payload  
                }

                return note
            })

            state.saveMessage = `${action.payload.title},actualizada correctamente`
        },
        setPhotosToActiveNote: (state,action) => {
            state.active.imgUrls = [...state.active.imgUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.saveMessage = '';
            state.notes = [];
            state.active = null;
        },
        deletNoteById: (state,action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload)
            state.active = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    increment,
    addNewEntryNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    savingNewNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deletNoteById

} = journalSlice.actions;