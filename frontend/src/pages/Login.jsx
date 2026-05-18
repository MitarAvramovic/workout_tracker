import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

import { useState } from "react";

import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";



import Loading from "../components/Loading";

import "../styles/Login.css";




export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (loading) return;

        try{

            setLoading(true);
            await login(username, password);
            toast.info("Welcome Back!");
            navigate("/dashboard");
            
        } catch (err) {
            console.log(err.response?.data);
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };


    return (
    <div className="login-page">
        <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>

            <input
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="button" onClick={() => setShow(!show)}>
                Show
            </button>

            <button type="submit">Login</button>

            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </form>
    </div>
);
}