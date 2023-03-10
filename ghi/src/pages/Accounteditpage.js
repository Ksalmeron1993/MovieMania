import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./Authentication";

function AccountEditForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const update = useToken()[4];
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(first_name, last_name, email, username, password);
    const response = await update(
      first_name,
      last_name,
      email,
      username,
      password
    );
    if (!response) {
      console.log("Reponse error here");
    } else {
      navigate("/AccountDetails");
      console.log("response:", response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="first_name" className="form-label">
          First name
        </label>
        <input
          required
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          className="form-control"
          id="first_name"
          placeholder="First name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="last_name" className="form-label">
          Last name
        </label>
        <input
          required
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          className="form-control"
          id="last_name"
          placeholder="Last name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="form-control"
          id="email"
          placeholder="email"
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
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          className="form-control"
          id="password"
          placeholder="Password"
        />
      </div>
      <button className="btn btn-primary">Save Changes</button>
    </form>
  );
}

export default AccountEditForm;
