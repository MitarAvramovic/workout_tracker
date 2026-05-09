import { useEffect, useState } from "react";
import Header from "../components/Header";
import { api } from "../api/api";

import "../styles/ViewWorkouts.css";

export default function ViewWorkouts() {
    const [workouts, setWorkouts] = useState([]);


    const fetchWorkouts = async () => {
        try {
            const res = await api.get("workouts/");

            console.log(res.data);

            setWorkouts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`workouts/${id}/`);

            setWorkouts(
                workouts.filter((workout) => workout.id !== id)
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);


    return (
        <div>
            <Header />

            <div className="workouts-page">
                <h1> Your Wokrouts </h1>
                {workouts.length === 0 ? (
                    <p>No workouts yet</p>
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

                                <button
                                    onClick={() => handleDelete(workout.id)}
                                >
                                    Delete
                                </button>
                            </div>

                            {workout.exercises.map((exercise) => (
                                <div
                                    key={exercise.id}
                                    className="exercise-section"
                                >
                                    <h3>
                                        {exercise.name_of_exercise}
                                    </h3>

                                    <div
                                        className="sets-container">

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

                        </div>
                    ))
                )}

            </div>

        </div>
    );

}