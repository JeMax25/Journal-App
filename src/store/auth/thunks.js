import { loginWhitEmailPassword, logoutFirebase, registerUserWhitEmail, singInWhitGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const googleSingIn = () => {

    return async( dispatch ) => {
        
        dispatch( checkingCredentials());
        
        const result = await singInWhitGoogle();

        if( !result.ok ) return dispatch( logout(result.errorMessage));

        dispatch( login( result ) )

    }
}

export const startCreateUserWhitEmail = ({email, password, displayName}) => {

    return async( dispatch ) => {
        
        dispatch( checkingCredentials());

        const { ok, uid, photoURL, errorMessage} = await registerUserWhitEmail({email, password, displayName});

        if (!ok) return dispatch(logout({errorMessage}))

        dispatch( login({uid, displayName, email, photoURL}))

    }
}

export const startLoginWhitEmailPassword = ({email,password}) => {

        return async ( dispatch )=> {

            dispatch( checkingCredentials());

            const { ok, errorMessage,  displayName, uid, photoURL} = await loginWhitEmailPassword({email,password});
            
            if(!ok) return dispatch(logout({errorMessage}));

            dispatch( login( {displayName, uid, photoURL, email}))
        }

}

export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout({ }) );

        
    }
}