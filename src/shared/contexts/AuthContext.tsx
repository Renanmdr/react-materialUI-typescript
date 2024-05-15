import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthServce } from '../servers/api/auth/AuthService';


interface IAuthContextData {
    logout: () => void
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<string | void>
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
    children: React.ReactNode
}

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
  const [acessToken, setAcessToken] = useState<string>();

  useEffect(() => {

    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if(accessToken){
      setAcessToken(accessToken);
    }else{
      setAcessToken(undefined);
    }
  }, []);

  const handleLogin = useCallback(async(email: string, password: string) => {
    const response = await AuthServce.auth(email, password);
    if(response instanceof Error){
      return response.message; 
    }else{
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(response.accessToken));
      setAcessToken(response.accessToken);
    }
  },[]);

  const handleLogut = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAcessToken(undefined);
  },[]);

  const isAuthenticated = useMemo(() => !!acessToken, []);
  
  return(
    <AuthContext.Provider value={{isAuthenticated, login: handleLogin, logout: handleLogut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);