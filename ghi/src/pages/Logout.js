// import React, { useState } from "react";
import { useToken, useAuthContext } from "./Authentication"
import { useNavigate } from "react-router-dom";

function Logout(){
    const logout = useToken()[2]
    const navigate = useNavigate()
    const {isLoggedIn} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = await logout()
        if (error) {
            isLoggedIn(false)
        } else {
            navigate("/") // change navigate to mainpage
        }
    }

    return (
            <div className = "row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Logout!</h1>
                        <form onSubmit={handleSubmit} id = "user-logout">
                        <button className="btn btn-primary" type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </div>

    )
}
 export default Logout;
