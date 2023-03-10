import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./Authentication";

function AccountDetailView() {
  const { user, token } = useAuthContext();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    } else {
      const fetchUserData = async () => {
        const url = `${process.env.REACT_APP_MOVIES_SERVICE_API_HOST}/users/get/${token.user.id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.log(response);
        }
      };
      fetchUserData();
    }

  }, [user, token, navigate]);
  return (
    <div>
      <h2 className="account-detail">Account Details</h2>
      <p>First Name: {userData.first_name}</p>
      <p>Last Name: {userData.last_name}</p>
      <p>Email: {userData.email}</p>
      <p>Username: {userData.username}</p>
      <button
        className="link-btn"
        type="submit"
        onClick={() => navigate("/AccountDetails/edit")}
      >
        Edit Account Information
      </button>
    </div>
  );
}
export default AccountDetailView;
