import { createContext } from "react";

type ViewAccount = {
  username: string;
  email: string;
};

type UserContext = {
  user: ViewAccount | null;
  login: (user: ViewAccount) => void;
  logout: () => void;
};

const UserContext = createContext<UserContext>({
  user: null,
  login: () => {},
  logout: () => {},
});

export default UserContext;
