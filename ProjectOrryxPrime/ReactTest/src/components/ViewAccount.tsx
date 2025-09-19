import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface AccountDetails {
  Username: string;
  Email: string;
}

function ViewAccount() {
  const { authUser, setAuthUser } = useAuth();

  const [accountDetails, setAccountDetails] = useState({
    Email: "",
    Username: "",
  });

  const navigation = useNavigate();

  useEffect(() => {
    if (authUser) {
      setAccountDetails({
        Email: authUser.Email,
        Username: authUser.Username,
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
          },
          body: JSON.stringify(accountDetails),
        }
      );
      const result = await updateResponseData.json();

      if (updateResponseData.ok) {
        alert("Account updated successfully.");
        setAuthUser({
          Username: result.username,
          Email: result.email,
          Id: result.id,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
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
                      <label htmlFor="userName">Username</label>
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
                      <label htmlFor="eMail">Email</label>
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
                    <button
                      type="button"
                      name="submit"
                      className="btn btn-primary"
                    >
                      Update
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
