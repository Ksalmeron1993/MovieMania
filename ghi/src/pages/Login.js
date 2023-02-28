import React, { useState } from "react";
import { useToken } from "./Authentication"
// import { useNavigate } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const login = useToken()[1]
    // const navigate = useNavigate()

    const handleUsernameChange = (e) => {
        const value = e.target.value
        setUsername(value)
    }
    const handlePasswordChange = e => {
        const value = e.target.value
        setPassword(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        login(username, password)
        const data = {}
        data.username = username
        data.password = password
        const url = "http://localhost:8080/login"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch (url, fetchConfig)
        if (response.ok) {
            setUsername('')
            setPassword('')
        }
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
                            <input onChange={handleUsernameChange} placeholder="username" required type="text" name="username" id="username" className="form-control" value={username}/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div>
                            <input onChange={handlePasswordChange} placeholder="********" required type="text" name="password" id="password" className="form-control" value={password} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login
