import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LoginFormDetails {
  Email: string;
  Password: string;
  Id: number;
}

function LoginForm() {
  const [loginDetails, setloginDetails] = useState<LoginFormDetails>({
    Email: "",
    Password: "",
    Id: 0,
  });

  const navigation = useNavigate();

  const { setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const loginHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (isLoggedIn) {
      navigation("/account");
    } else {
      try {
        const loginResponseData = await fetch(
          "http://localhost:51003/loginController/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails),
          }
        );
        const result = await loginResponseData.json();

        if (loginResponseData.ok) {
          setIsLoggedIn(true);
          setAuthUser({ Username: result.username, Email: result.email, Id: result.id });
          navigation("/account", { state: { user: result } });
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again later.");
        setIsLoggedIn(false);
        setAuthUser(null);
      }
    }
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={loginDetails.Email}
            onChange={(e) =>
              setloginDetails({ ...loginDetails, Email: e.target.value })
            }
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={loginDetails.Password}
            onChange={(e) =>
              setloginDetails({ ...loginDetails, Password: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default LoginForm;
