import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormDetails {
  email: string;
  password: string;
}

function LoginForm() {
  const [loginDetails, setloginDetails] = useState<LoginFormDetails>({
    email: "",
    password: "",
  });

  const navigation = useNavigate();

  const loginHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const loginResponseData = await fetch("http://localhost:51003/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      const result = await loginResponseData.json();

      if (loginResponseData.ok) {
        navigation("/account");
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
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
            value={loginDetails.email}
            onChange={(e) =>
              setloginDetails({ ...loginDetails, email: e.target.value })
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
            id="exampleInputPassword1 "
            value={loginDetails.password}
            onChange={(e) =>
              setloginDetails({ ...loginDetails, password: e.target.value })
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
