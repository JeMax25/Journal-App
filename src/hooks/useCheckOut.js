import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FireBaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckOut = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch()
  
    useEffect(() => {
  
        onAuthStateChanged( FireBaseAuth,async( user ) => {
          if  (!user ) return dispatch(logout());
    
          const { uid,displayName,email,photoURL } = user;
    
          dispatch( login( {uid,displayName,email,photoURL  }));
          dispatch( startLoadingNotes());
        } )
    
      }, []);

      return {
        status
      }

}
