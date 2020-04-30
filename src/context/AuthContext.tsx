import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<{ token: string; user: string }>(
      'sessions',
      {
        email,
        password,
      },
    );

    const { token, user } = response.data;

    // parou aqui
    localStorage.setItem('@Gobarber', token);
    localStorage.setItem('@Gobarber', JSON.stringify(user));
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Luan', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
