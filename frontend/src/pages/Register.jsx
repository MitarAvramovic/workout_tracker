import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

import { toast } from "react-toastify";

import "../styles/Register.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();

        console.log("SENDING POST");

        try {
            const res = await api.post("accounts/register/", {
                username,
                password,
            });

            console.log("Registered:", res.data);
            toast.success("Account created!");
            navigate("/login");
        } catch (err) {
            console.log(err.response?.data);
            toast.error("Something went wrong!");


        }
    };

    return (
    <div className="register-page">
        <form className="register-form" onSubmit={handleRegister}>
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
    </div>
    );

}