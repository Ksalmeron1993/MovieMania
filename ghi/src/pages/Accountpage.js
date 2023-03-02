import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "./Authentication";



const AccountDetailView = (user) => {
//   const { user } = useAuthContext();

  return (
    <div className="accountwrapper">
      {user && (
        <>
          <h2>First Name: {user.first_name}</h2>
          <h2>Last Name: {user.last_name}</h2>
          <h2>Email: {user.email}</h2>
          <h2>Username: {user.username}</h2>
          <div className="buttons-wrapper">
            <Link to={"/AccountEditForm"}>Edit Profile</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountDetailView;

// function Accountpage (){
// //     const [accountDetails, setAccountDetails] = useState("");
// //     const [username, setUsername] = useState("");
// //     const [updateUsername, setUpdateUsername] = useState();
// //     const [, token] = useToken();

// //     useEffect(() => {
// //         async function fetchAccountDetails() {}
// //     });

// //     const handleUsernameUpdate = async (e) => {
// //         e.preventDefault();

// //     }

// // }
// export default Accountpage
