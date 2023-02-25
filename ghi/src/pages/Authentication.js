// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// let internalToken = null

// export function getToken() {
//   return internalToken
// }

// export async function getTokenInternal() {
//   const url = `${}/token`
//   try {
//     const response = await fetch(url, {
//       credentials: "include",
//     });
//     if (response.ok) {
//       const data = await response.json()
//       internalToken = data.access_token
//       return internalToken
//     }
//   } catch (e) {}
//   return false
// }

// export const AuthContext = createContext({
//   token: null,
//   setToken: () => null,
// });

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null)

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuthContext = () => useContext(AuthContext)

// useEffect(() => {
// async function fetchToken() {
//     const token = await getTokenInternal()
//     setToken(token)
// }
// if (!token) {
//     fetchToken()
// }
// }, [setToken, token])

// async function logout() {
// if (token) {
//     const url = `${}/token`
//     console.log(url)
//     await fetch(url, { method: "delete", credentials: "include" })
//     internalToken = null
//     setToken(null)
//     navigate("/")
// }
// }


// async funciton for login, logout, signup, update, delete