interface AccountDetails {
  email: string;
  username: string;
}

function ViewAccount() {
  const accountDetails: AccountDetails = {
    email: "",
    username: "",
  };

  fetch("http://localhost:51003/controller/account")
    .then((response) => response.json())
    .then((data) => {
      accountDetails.email = data.email;
      accountDetails.username = data.username;
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
                    <label htmlFor="userName">{accountDetails.username}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="eMail">{accountDetails.email}</label>
                    <input
                      type="email"
                      className="form-control"
                      id="eMail"
                      placeholder="Enter email ID"
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
