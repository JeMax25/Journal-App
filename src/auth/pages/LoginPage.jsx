import { AuthLayout } from '../layout/AuthLayout';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { checkingAuthentication, googleSingIn, startLoginWhitEmailPassword } from '../../store/auth';
import { Google } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { useMemo } from 'react';

const formData = {
  email: 'jemax@gmail.com',
  password: '123456'
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch()

  const { email, password, onInputChange} = useForm(formData);

  const isAuthenticated = useMemo( () => status === 'checking', [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();
    console.log(email,password);

    dispatch(startLoginWhitEmailPassword({email,password}))
  }

  const onGoogleSingIn = () => {
    console.log('Google login');
    dispatch(googleSingIn());


  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={ email }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } display={!!errorMessage ? '' : 'none'}> 
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }> 
                <Button 
                type="submit" variant='contained' fullWidth disabled={ isAuthenticated }>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button onClick={onGoogleSingIn} variant='contained' fullWidth disabled={ isAuthenticated } >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
