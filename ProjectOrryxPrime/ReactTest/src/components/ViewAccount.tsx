import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ViewAccount() {
  const { authUser, setAuthUser, setIsLoggedIn } = useAuth();

  const [accountDetails, setAccountDetails] = useState({
    Email: "",
    Username: "",
    NewPassword: "",
    RepeatNewPassword: "",
    Password: "",
    Id: 0,
  });

  const navigation = useNavigate();

  useEffect(() => {
    if (authUser) {
      setAccountDetails({
        Email: authUser.Email,
        Username: authUser.Username,
        NewPassword: "",
        RepeatNewPassword: "",
        Password: "",
        Id: authUser.Id,
      });
    }
  }, [authUser]);

  const getNewAccountDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const updateAccountHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const updateResponseData = await fetch(
        "http://localhost:51003/accountController/account",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(accountDetails),
        }
      );
      const result = await updateResponseData.json();

      if (updateResponseData.ok) {
        alert("Account updated successfully.");
        setAuthUser({
          Username: result.Username,
          Email: result.Email,
          Id: result.Id,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  const deleteAccountHandler = async () => {
    try {
      const deleteResponseData = await fetch(
        `http://localhost:51003/accountController/deleteAccount`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(accountDetails.Id),
        }
      );
      if (deleteResponseData.ok) {
        alert("Account deleted successfully.");
        setAuthUser(null);
        setIsLoggedIn(false);
        navigation("/");
      }
    } catch (error) {
      console.error("Error during account deletion:", error);
      alert(
        "An error occurred during account deletion. Please try again later."
      );
    }
  };

  return (
    <form onSubmit={updateAccountHandler}>
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="Username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Username"
                        placeholder="Enter full name"
                        value={accountDetails.Username}
                        onChange={getNewAccountDetails}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="Email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="Email"
                        placeholder="Enter email ID"
                        value={accountDetails.Email}
                        onChange={getNewAccountDetails}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="NewPassword"
                        placeholder="Enter a New Password"
                        value={accountDetails.NewPassword}
                        onChange={getNewAccountDetails}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword2">
                        Repeat New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="RepeatNewPassword"
                        placeholder="Repeat a New Password"
                        value={accountDetails.RepeatNewPassword}
                        onChange={getNewAccountDetails}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="Password"
                        placeholder="Current Password"
                        value={accountDetails.Password}
                        onChange={getNewAccountDetails}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigation("/")}
                    >
                      Back Home
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        const confirmed = window.confirm(
                          "Are you sure you want to delete this account?"
                        );
                        if (confirmed) {
                          deleteAccountHandler();
                        }
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ViewAccount;
