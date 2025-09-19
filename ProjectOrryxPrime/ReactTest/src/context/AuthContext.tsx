import React, { useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  authUser: { Id: number; Username: string; Email: string } | null;
  setAuthUser: (
    user: { Id: number; Username: string; Email: string } | null
  ) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authUser, setAuthUser] = useState<{
    Id: number;
    Username: string;
    Email: string;
  } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
    if (storedLoggedIn !== null) {
      setIsLoggedIn(JSON.parse(storedLoggedIn));
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [authUser]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    } else {
      localStorage.removeItem("isLoggedIn");
    }
  }, [isLoggedIn]);

  const value: AuthContextType = {
    authUser,
    setAuthUser: setAuthUser,
    isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
