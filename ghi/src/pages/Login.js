//import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// need to import a useToken from Authentication 

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = useToken()[1];
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
            login(username, password);
    }
    function handleClick() {
        navigate("/signup");
    }


    return (
        <div className = "row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Hello Movie Maniac!
                        Login!</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">

                        </div>
                        
                    </form>

                </div>
            </div>
        </div>
    );
}
export default Login
