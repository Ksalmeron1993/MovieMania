import React, { useState, useEffect } from "react";
import { useAuthContext, useToken } from "./Authentication";

function AccountDetailView () {
    //const [token] = useToken()[0]
    const { user, token } = useAuthContext()
    const [userData, setUserData] = useState({})

    useEffect(() => {
      if (!token) {
        //console.log('Token is missing')
        console.log('token error:', token)
        return;
      }else{
        const fetchUserData = async () => {
        console.log('Fetching user data...')
        const url = `http://localhost:8000/users/get/${token.user.id}`
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.ok) {
          const data = await response.json()
          console.log('User data:', data)
          setUserData(data)
        } else {
          console.log(response)
        }
      };
      fetchUserData()
      }
      if (!user) {
        // console.log('User is not logged in')
        console.log('user error:', user)
        // return
      }
      // else{
      //   console.log('user:', user)
      // }
      
      
    }, [user, token])

  return (
    <div>
      <h2 className="account-detail">Account Details</h2>
      <p>First Name: {userData.first_name}</p>
      <p>Last Name: {userData.last_name}</p>
      <p>Email: {userData.email}</p>
      <p>Username: {userData.username}</p>
      {/* <p>Password: {userData.hashed_password}</p> */}
    </div>
  );
};
export default AccountDetailView;