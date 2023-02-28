import React, {useState} from "react";
import {useToken} from "./Authentication.js"

function Signup(){
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const signup =  useToken()[1]

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value)
    }
    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value)
    }
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value)
    }
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
        signup(
            first_name,
            last_name,
            username, 
            email, 
            password
        )
        // navigate("/")
        
        // const data = {}
        // data.firstName = firstName
        // data.lastName = lastName
        // data.email = email
        // data.username = username
        // data.password = password
        // const url = `${process.env.REACT_APP_MOVIE}/signup`
        // const fetchConfig = {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // }
        // const response = await fetch (url, fetchConfig)
        // if (response.ok) {
        //     setFirstName("")
        //     setLastName("")
        //     setEmail('')
        //     setUsername('')
        //     setPassword('')
        // }
    }

    return (
        <div className = "row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Become a Movie Maniac! Sign up!</h1>
                    <form onSubmit={handleSubmit} id = "create-user">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} placeholder="First Name" required type="text" name="first" id="email" className="form-control" value={first_name}/>
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} placeholder="Last Name" required type="text" name="email" id="email" className="form-control" value={last_name}/>
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmailChange} placeholder="your@email.com" required type="text" name="email" id="email" className="form-control" value={email}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleUsernameChange} placeholder="username" required type="text" name="username" id="username" className="form-control" value={username}/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div>
                            <input onChange={handlePasswordChange} placeholder="********" required type="text" name="password" id="password" className="form-control" value={password} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button className="btn btn-primary">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );    
}
export default Signup
