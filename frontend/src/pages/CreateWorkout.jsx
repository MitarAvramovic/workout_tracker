import { useState } from "react";
import Header from "../components/Header";
import { api } from "../api/api";
import "../styles/createWorkout.css";

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

    // SUBMIT
    const handleSubmit = async (e) => {
    e.preventDefault();

    const workoutData = { week, day, exercises };

    try {
        await api.post("workouts/", workoutData);
        
    } catch (err) {
        console.log(err);
    }
};

    return (
        <div>

            <Header />

            <div className="create-workout-container">

                <form
                    className="create-workout-form"
                    onSubmit={handleSubmit}
                >

                    <h1>Create Workout</h1>

                    <input
                        type="number"
                        placeholder="Week"
                        value={week}
                        onChange={(e) => setWeek(e.target.value)}
                    />

                    <input
                        type="number"
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

            </div>

        </div>
    );
}