import { useState } from "react";

import { api } from "../api/api";

import { toast } from "react-toastify";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import "../styles/CreateWorkout.css";

export default function CreateWorkout() {

    const [week, setWeek] = useState("");
    const [day, setDay] = useState("");


    const [exercises, setExercises] = useState([
        {
            name_of_exercise: "",
            sets: [
                { reps: "" }
            ]
        }
    ]);

    const currentDate = new Date().toLocaleDateString();

    // ADD EXERCISE
    const addExercise = () => {
        setExercises([
            ...exercises,
            {
                name_of_exercise: "",
                sets: [
                    { reps: "" }
                ]
            }
        ]);
    };

    // REMOVE EXERCISE
    const removeExercise = (exerciseIndex) => {
        const updated = [...exercises];

        updated.splice(exerciseIndex, 1);

        setExercises(updated);
    };

    // CHANGE EXERCISE NAME
    const handleExerciseNameChange = (index, value) => {
        const updated = [...exercises];

        updated[index].name_of_exercise = value;

        setExercises(updated);
    };

    // ADD SET
    const addSet = (exerciseIndex) => {
        const updated = [...exercises];

        updated[exerciseIndex].sets.push({
            reps: ""
        });

        setExercises(updated);
    };

    // REMOVE SET
    const removeSet = (exerciseIndex, setIndex) => {
        const updated = [...exercises];

        updated[exerciseIndex].sets.splice(setIndex, 1);

        setExercises(updated);
    };

    // CHANGE REPS
    const handleRepsChange = (exerciseIndex, setIndex, value) => {
        const updated = [...exercises];

        updated[exerciseIndex].sets[setIndex].reps = value;

        setExercises(updated);
    };
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!week || week < 1) {
            toast.error("Week must be at least 1");
            return;
        }
        if (!day || day < 1) {
            toast.error("Day must be at least 1");
            return;
        }


        setSubmitting(true);

        const workoutData = { week, day, exercises };

        try {
            await api.post("workouts/", workoutData);

            toast.success("Workout successfully created!");

        } catch (err) {
            toast.error("Something went wrong.");

            console.log(err.response.data);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <div className="createWorkout">


                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}


                <div className="create-workout-container">
                    {submitting ? (
                        <Loading />
                    ) : (
                        <form
                            className="create-workout-form"
                            onSubmit={handleSubmit}
                        >

                            <h1>Create Workout</h1>

                            <input className="input-week"
                                type="number"
                                // min="0"
                                placeholder="Week"
                                value={week}
                                onChange={(e) => setWeek(e.target.value)}
                            />

                            <input className="input-day"
                                type="number"
                                // min="0"
                                placeholder="Day"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                            />

                            <div className="created-at">
                                Created at: {currentDate}
                            </div>

                            {/* EXERCISES */}

                            {exercises.map((exercise, exerciseIndex) => (
                                <div
                                    key={exerciseIndex}
                                    className="exercise-box"
                                >

                                    <input
                                        type="text"
                                        placeholder="Exercise name"
                                        value={exercise.name_of_exercise}
                                        onChange={(e) =>
                                            handleExerciseNameChange(
                                                exerciseIndex,
                                                e.target.value
                                            )
                                        }
                                    />

                                    {/* SETS */}

                                    {exercise.sets.map((set, setIndex) => (
                                        <div
                                            key={setIndex}
                                            className="set-row"
                                        >

                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Reps"
                                                value={set.reps}
                                                onChange={(e) =>
                                                    handleRepsChange(
                                                        exerciseIndex,
                                                        setIndex,
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeSet(
                                                        exerciseIndex,
                                                        setIndex
                                                    )
                                                }
                                            >
                                                Remove Set
                                            </button>

                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            addSet(exerciseIndex)
                                        }
                                    >
                                        Add Set
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeExercise(exerciseIndex)
                                        }
                                    >
                                        Remove Exercise
                                    </button>

                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addExercise}
                            >
                                Add Exercise
                            </button>

                            <button type="submit">
                                Save Workout
                            </button>

                        </form>
                    )}
                </div>

            </div>
            <Footer />
        </>
    );
}