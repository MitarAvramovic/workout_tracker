import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { api } from "./api/api";



import { ToastContainer } from "react-toastify";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateWorkout from "./pages/CreateWorkout";
import ViewWorkouts from "./pages/ViewWorkouts";

import "./styles/toast.css";



export default function App(){

    

    useEffect(() => {
        api.get("accounts/csrf/");
    }, []);

    return(
        <>    
        <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/createWorkout" element={<CreateWorkout />}/>
                <Route path="/viewWorkouts" element={<ViewWorkouts />} />
        </Routes>

        <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="dark"
            pauseOnHover={false}
        />
        </>    
    );
}

