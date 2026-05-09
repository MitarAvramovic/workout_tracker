import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

import Header from "../components/Header";
import "../styles/Dashboard.css";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get ("accounts/me");
                setUser(res.data);
            } catch(err){
                console.log(err);
            }
        };
        fetchUser();
    }, []);
    return(
        <div className="dashboard">

           <Header />

            <div className="center">
                <h1> 
                    Welcome to Workout Tracker 
                    {" "}
                    {user?.username && user.username.toUpperCase()}
                </h1>

                <p> One place to track your progress </p>

                <button 
                    className="cta-btn"
                    onClick={() => navigate("/createWorkout")}
                >
                    Create Your Workout
                </button>
            </div>
        </div>
    )
}