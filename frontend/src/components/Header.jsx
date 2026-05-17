import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { toast } from "react-toastify";

import "../styles/Header.css";

export default function Header() {

    // AUTH
    const { user, logout } = useAuth();

    // NAVIGATION
    const navigate = useNavigate();

    // STATES
    const [menuOpen, setMenuOpen] = useState(false);

    // REFS
    const dropdownRef = useRef(null);

    // LOGOUT
    const handleLogout = async () => {

        try {

            await logout();

            toast.info("Logged out");

            navigate("/login");

        } catch (err) {

            toast.error("Something went wrong");

            console.log(err);
        }
    };

    // NAVIGATE + CLOSE MENU
    const handleNavigate = (path) => {

        setMenuOpen(false);

        navigate(path);
    };

    // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    useEffect(() => {

        const handleClickOutside = (e) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return (
        <header className="header">

            {/* LEFT */}
            <Link
                to="/dashboard"
                className="header-logo"
            >
                {user?.username?.toUpperCase()}
            </Link>

            {/* RIGHT */}
            <div className="header-right">

                {/* DROPDOWN */}
                <div
                    className="dropdown-wrapper"
                    ref={dropdownRef}
                >

                    <button
                        className="dropdown-trigger"
                        onClick={() =>
                            setMenuOpen((prev) => !prev)
                        }
                    >
                        Menu

                        <span
                            className={`dropdown-arrow ${
                                menuOpen ? "open" : ""
                            }`}
                        >
                            ▾
                        </span>
                    </button>

                    <div
                        className={`dropdown-menu ${
                            menuOpen
                                ? "dropdown-open"
                                : ""
                        }`}
                    >

                        <button
                            className="dropdown-item"
                            onClick={() =>
                                handleNavigate("/createWorkout")
                            }
                        >
                            Create Workout
                        </button>

                        <button
                            className="dropdown-item"
                            onClick={() =>
                                handleNavigate("/viewWorkouts")
                            }
                        >
                            View Workouts
                        </button>

                    </div>

                </div>

                {/* LOGOUT */}
                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </header>
    );
}