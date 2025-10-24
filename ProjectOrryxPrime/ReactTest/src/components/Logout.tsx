import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setAuthUser, setIsLoggedIn } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("isLoggedIn");

    setAuthUser(null);
    setIsLoggedIn(false);
    localStorage.clear();

    navigation("/");
  }, []);

  return null;
}
export default Logout;
