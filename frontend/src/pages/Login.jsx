import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();

        try{

            const res = await api.post("accounts/login/", {
                username,
                password,
            });
            
            console.log("Logged in:", res.data);
            alert("Logged in!");

            window.location.href = "/dashboard";
            
        } catch (err) {
            console.log(err.response?.data);
            alert("Invalid credentials");
        }
    };


    return(
        <form onSubmit={handleLogin}>
            <h2> Login </h2>
            <input 
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type={show ? "text": "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShow(!show)}> Show </button>
            <button type="submit"> Login </button>
            <p>
                Don't have an account? <Link to="/register"> Register </Link>
            </p>
        </form>
    );
}