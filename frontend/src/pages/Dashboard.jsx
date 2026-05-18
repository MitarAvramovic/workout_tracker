import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import "../styles/Dashboard.css";
import { useEffect, useState } from "react";


export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("accounts/me/");

                setUser(res.data);

            } catch (err) {
                console.log(err);

            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);
    return (
        <>
            <Header />
            <div className="dashboard">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="center">
                        <h1>
                            Welcome to Workout Tracker {" "}

                            <span className="italic-name">
                                {user?.username && user.username.toUpperCase()}
                            </span>
                        </h1>

                        <p className="p"> One place to track your progress </p>

                        <button
                            onClick={() => navigate("/createWorkout")}
                        >
                            Create Your Workout
                        </button>
                    </div>
                )};
            </div>
            <Footer />
        </>
    );
}