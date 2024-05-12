import { HomePage } from '../pages/home/home';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../shared/constants/routes';
import { SignInPage } from '../pages/sign-in/sing-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AuthProvider } from './providers/auth.provider';

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.signIn} element={<SignInPage />} />
      <Route path={ROUTES.signUp} element={<SignUpPage />} />
      <Route path={ROUTES.root} element={<AuthProvider><HomePage /></AuthProvider>} />
    </Routes>
  );
};

export default App;