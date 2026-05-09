import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log("SENDING POST");

        try {
            const res = await api.post("accounts/register/", {
                username,
                password,
            });

            console.log("Registered:", res.data);
            alert("User created!");
        } catch (err) {
            console.log(err.response?.data);
            alert("Error registring user");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2> Register </h2>

            <input
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type={show ? "text" : "password"}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShow(!show)}> Show </button>
            <button type="submit"> Register </button>
            <p>
                Already have an account? <Link to="/login"> Login </Link>
            </p>
        </form>
    );

}