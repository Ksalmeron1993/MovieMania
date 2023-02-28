//import
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Nav 
// import a token from Authentication


function Accountpage (){
    const [accountDetails, setAccountDetails] = useState("");
    const [username, setUsername] = useState("");
    const [updateUsername, setUpdateUsername] = useState();
    const [, token] = useToken();

    useEffect(() => {
        async function fetchAccountDetails() {}
    });

    const handleUsernameUpdate = async (e) => {
        e.preventDefault();
        
    }

}
export default Accountpage
