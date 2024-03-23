import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useContext(UserContext);

    function registerUser(e) {
        e.preventDefault();

        const data = { email, password };
        axios.post('http://localhost:4000/register', data, { withCredentials: true })
            .then(response => {
               console.log(response.data); // Check the response data
               if (response.data && response.data.email) {
                   user.setUser(response.data.email); // Assuming setUser is used to set user email
               }
            })
            .catch(error => {
                console.error('Error registering user:', error);
            });
    }

    return (
        <form onSubmit={registerUser}>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
