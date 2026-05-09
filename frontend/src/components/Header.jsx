import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import "../styles/Header.css";

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const fetchUser = async () => {
        try {
            const res = await api.get("accounts/me/");
            setUser(res.data);
        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    };

    const handleLogout = async () => {
        try {
            await api.post("accounts/logout/");
            window.location.href = "/login";
        } catch (err) {
            console.log(err);
        }
    };

    const handleNavigate = (path) => {
        setMenuOpen(false);
        navigate(path);
    };

    // Zatvori meni kada kliknes van njega
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <header className="header">

            {/* LEFT */}
            <Link to="/dashboard" className="header-logo">
                {user?.username?.toUpperCase()}
            </Link>

            {/* RIGHT */}
            <div className="header-right">

                {/* CUSTOM DROPDOWN */}
                <div className="dropdown-wrapper" ref={dropdownRef}>
                    <button
                        className="dropdown-trigger"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        Menu
                        <span className={`dropdown-arrow ${menuOpen ? "open" : ""}`}>▾</span>
                    </button>

                    <div className={`dropdown-menu ${menuOpen ? "dropdown-open" : ""}`}>
                        <button
                            className="dropdown-item"
                            onClick={() => handleNavigate("/createWorkout")}
                        >
                            Create Workout
                        </button>
                        <button
                            className="dropdown-item"
                            onClick={() => handleNavigate("/viewWorkouts")}
                        >
                            View Workouts
                        </button>
                    </div>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </header>
    );
}