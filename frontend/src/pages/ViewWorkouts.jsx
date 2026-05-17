import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../api/api";
import { toast } from "react-toastify";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfirmModal";


import useWorkouts from "../hooks/useWorkouts";

import "../styles/ViewWorkouts.css";


export default function ViewWorkouts() {
    
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate();

    // FETCH WORKOUTS

    const { workouts, loading, deleteWorkout } = useWorkouts();

    // DELETE WORKOUT
    const handleDelete = async (id) => {
        const ok = await deleteWorkout(id);

        if (ok) {
            toast.success("Workout deleted");

        } else {
            toast.error("Something went wrong.");
        }

    };

    return (
        <>
            <Header />

            <div className="page">
                <div className="content">
                    <div className="workouts-page">
                        <h1 className="h1">Your Workouts</h1>

                        {/* LOADING */}
                        {loading ? (
                            <Loading />
                        ) : workouts.length === 0 ? (
                            <div className="empty-state">
                                <h2>No workouts yet</h2>
                                <p>
                                    Start your fitness journey by creating your first workout.
                                </p>

                                <button
                                    className="empty-btn"
                                    onClick={() => navigate("/createWorkout")}
                                >
                                    Create Workout
                                </button>
                            </div>
                        ) : (
                            workouts.map((workout) => (
                                <div
                                    key={workout.id}
                                    className="workout-card"
                                >
                                    <div className="workout-top">
                                        <h2>
                                            Week {workout.week} - Day {workout.day}
                                        </h2>
                                    </div>

                                    {workout.exercises.map((exercise) => (
                                        <div
                                            key={exercise.id}
                                            className="exercise-section"
                                        >
                                            <h3>
                                                {exercise.name_of_exercise}
                                            </h3>

                                            <div className="sets-container">
                                                {exercise.sets.map((set) => (
                                                    <div
                                                        key={set.id}
                                                        className="set-box"
                                                    >
                                                        {set.reps} reps
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        className="delete_button"
                                        onClick={() =>
                                            setDeleteId(workout.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* GLOBAL MODAL (ONLY ONE) */}
            <ConfirmModal
                open={deleteId !== null}
                title="Delete workout?"
                description="This action cannot be undone."
                onCancel={() => setDeleteId(null)}
                onConfirm={() => {
                    handleDelete(deleteId);
                    setDeleteId(null);
                }}
            />

            <Footer />
        </>
    );
}