import React, { useState } from "react";
import { useToken, useAuthContext } from "./Authentication"
import { useNavigate } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const login = useToken()[1]
    const {isLoggedIn} = useAuthContext()
    const navigate = useNavigate()

    const handleUsernameChange = (e) => {
        const value = e.target.value
        setUsername(value)
    }
    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const error = await login(username, password);
        if (error) {
            isLoggedIn(false)
        } else {
            navigate("/signup") // change navigate to homepage
        }


        await login (
            username, 
            password
        )
        console.log("You logged in!!")






        // const response = await login(
        //     username, 
        //     password
        //     )
        // if (response.ok) {
        //     isLoggedIn(false);
        // }
        // console.log(response)

    //     const data = {}
    //     data.username = username
    //     data.password = password
    //     const url = "http://localhost:8080/login"
    //     const fetchConfig = {
    //         method: "POST", // should this be a get method?
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }

    //     if (response.ok) {
    //         setUsername('')
    //         setPassword('')
    //     }
    }



    // function handleClick() {
    //     navigate("/signup")
    // } to go to /sign up link


    return (
        <div className = "row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Hello Movie Maniac! Login! </h1>
                    <form onSubmit={handleSubmit} id = "user-login">
                        <div className="form-floating mb-3">
                            <input onChange={handleUsernameChange} placeholder="username" required type="text" name="username" className="form-control" value={username}/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div>
                            <input onChange={handlePasswordChange} placeholder="********" required type="text" name="password" className="form-control" value={password} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button className="btn btn-primary" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;
