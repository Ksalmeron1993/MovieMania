// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "./auth";

// function AccountEditForm() {
//     const token = useToken()[0]
//     const [user, setUser] = useState()
//     const [first_name, setFirstName] = useState("");
//     const [last_name, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const accountedit = useToken()[3];
//     const navigate = useNavigate();
//     const { isLoggedIn } = useAuthContext();

//     const

//     const handleFirstNameChange = (e) => {
//         const value = e.target.value;
//         setFirstName(value)
//     }
//     const handleLastNameChange = (e) => {
//         const value = e.target.value;
//         setLastName(value)
//     }
//     const handleEmailChange = (e) => {
//         const value = e.target.value;
//         setEmail(value)
//     }
//     const handleUsernameChange = (e) => {
//         const value = e.target.value
//         setUsername(value)
//     }
//     const handlePasswordChange = (e) => {
//         const value = e.target.value
//         setPassword(value)
//     }
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const response = await AccountEditForm(
//             first_name,
//             last_name,
//             email,
//             username,
//             password,
//         )
//         if (response) {
//             navigate("/AccountDetailView")
//         }





//     }
// }
// export default AccountEditForm;
