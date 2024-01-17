import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateUserWhitEmail } from '../../store/auth/thunks';

const initalForm = {
  email: '',
  password: '',
  displayName: '',
}


const formValidation = {
  email: [ (value) => value.includes('@'), 'El correo debe tener un @'],
  password: [ (value) => value.length >= 6, 'El password debe tener mas de 6 letras.'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
}


export const RegisterPage = () => {

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector( state => state.auth );

  const isCheckingAuth = useMemo( () => status === 'checking', [status]);

  const [formSubmited, setFormSubmited] = useState(false);

  const { displayName, email, password, onInputChange, formState , displayNameValid, emailValid,passwordValid, isFormValid} = 
    useForm(initalForm, formValidation);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    if (!isFormValid)return;
    
    dispatch( startCreateUserWhitEmail(formState))
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name='displayName'
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmited}
                helperText={ !!displayNameValid && formSubmited? displayNameValid : null}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmited}
                helperText={ emailValid && formSubmited? emailValid : null}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmited}
                helperText={ passwordValid && formSubmited? passwordValid : null }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } display={ !!errorMessage ? '': 'none'}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
              <Grid item xs={ 12 }>
                <Button type='submit' variant='contained' fullWidth disabled={isCheckingAuth}>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
