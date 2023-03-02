import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, useToken } from "./Authentication";



function AccountDetailView () {
//   const { user } = useAuthContext();
    const token = useToken()[0]
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    const {isLoggedIn} = useAuthContext()
    const fetchUser = async () => {
      const url = `http://localhost:8000/users/get/${user.id}`
      const fetchConfig = {
        method:"GET",
        headers: {
          Authorization:`Bearer ${token}`,
        }
      }
      const response = await fetch(url, fetchConfig)
      // if (isLoggedIn) {
        const data = await response.json()
        setUser(data)
      // }else {
      //   navigate("/login")
      // }
    }
    useEffect(() => {
      fetchUser()
    }, [token])


  return (
    <div>
      <h2 className="account-detail">Account Details</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.password}</td>
          </tr>
        </tbody>
      </table>
      {/* <div className="buttons-wrapper">
        <Link to={"/AccountEditForm"}>Edit Profile</Link>
      </div> */}
    </div>

  );
};

export default AccountDetailView;

// <div className="accountwrapper">
    //   {user && (
    //     <>
    //       <h2>First Name: {user.first_name}</h2>
    //       <h2>Last Name: {user.last_name}</h2>
    //       <h2>Email: {user.email}</h2>
    //       <h2>Username: {user.username}</h2>
    //       <div className="buttons-wrapper">
    //         <Link to={"/AccountEditForm"}>Edit Profile</Link>
    //       </div>
    //     </>
    //   )}
    // </div>

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
