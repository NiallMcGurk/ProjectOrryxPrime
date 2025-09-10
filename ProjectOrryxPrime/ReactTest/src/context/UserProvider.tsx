import React, { ReactNode, useState } from "react";
import UserContext from "./UserContext";

interface UserData {
  username: string;
  email: string;
}

interface UserProviderChild {
  children: ReactNode;
}

const UserProvider = ({ children }: UserProviderChild) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = (userData: UserData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
