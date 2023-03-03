import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext, useToken } from "./Authentication";

// const AccountEditForm = () => {
//   let { user, setUser } = useAuthContext();
//   const { token } = useAuthContext();
//   const [submitted] = useState(false);
//   const [username, setUsername] = useState("");
//   const [first_name, setFirstName] = useState("");
//   const [last_name, setLastName] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = { first_name, last_name, username, };
//     const editUrl = `http://localhost:8000/users/${token.user.id}`;
//     const fetchConfig = {
//       method: "PUT",
//       body: JSON.stringify(data),
//       headers: {
//         // "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const response = await fetch(editUrl, fetchConfig);
//         setUser(() => ({
//         first_name: first_name,
//         last_name: last_name,
//         username: username,
//         }));
//         navigate("/AccountDetail");
//         console.log(response);
//     };
function AccountEditForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const update = useToken()[4];
  const navigate = useNavigate();
//   const { isLoggedIn } = useAuthContext();

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await update(first_name, last_name, username);
    if (response) {
      navigate("/login");
    } else {
    //   isLoggedIn(false); // change navigate to homepage
        console.log(response)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstname" className="form-label">
          First name
        </label>
        <input
          required
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          className="form-control"
          id="firstname"
          placeholder="First name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last name
        </label>
        <input
          required
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          className="form-control"
          id="lastName"
          placeholder="Last name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="form-control"
          id="username"
          placeholder="Username"
        />
      </div>
      <button className="btn btn-primary">Save Changes</button>
      {/* {submitted && (
        <div className="success-message">
          Success! Your account has been updated.
        </div>
      )} */}
    </form>
  );
}

export default AccountEditForm;
