import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { useCheckOut } from '../hooks/useCheckOut';


export const AppRouter = () => {

  const { status } = useCheckOut();

  if( status === 'checking') {
    return <CheckingAuth/>
  }
    
  return (
    <Routes>

      {
        (status === 'authenticated')
          ? <Route path="/*" element={ <JournalRoutes /> } />
            : <Route path="/auth/*" element={ <AuthRoutes /> } />
      }

      <Route path='/*' element={<Navigate to={'/auth/login'}></Navigate>}></Route>

        {/* Login y Registro */}
        {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

        {/* JournalApp */}
        {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

    </Routes>
  )
}
