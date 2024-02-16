import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface IAuthContext {
  accessToken: string;
  loggedIn: boolean;
  setAccessToken?: Dispatch<SetStateAction<string>>;
  setLoggedIn?: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext>({
  accessToken: '',
  loggedIn: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
