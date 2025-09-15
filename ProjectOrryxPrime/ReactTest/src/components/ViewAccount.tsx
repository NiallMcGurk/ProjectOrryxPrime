import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface AccountDetails {
  Username: string;
  Email: string;
}

function ViewAccount() {
  const { authUser } = useAuth();

  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    Email: authUser?.Email || "",
    Username: authUser?.Username || "",
  });

  return (
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
                      id="userName"
                      placeholder="Enter full name"
                      value={accountDetails.Username}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="eMail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="eMail"
                      placeholder="Enter email ID"
                      value={accountDetails.Email}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="text-right">
                  <button
                    type="button"
                    id="submit"
                    name="submit"
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    id="submit"
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
  );
}

export default ViewAccount;
