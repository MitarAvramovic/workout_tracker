import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function useWorkouts() {

    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // FETCH
    const fetchWorkouts = async () => {

        try {

            setLoading(true);

            const res = await api.get("workouts/");

            setWorkouts(res.data);

        } catch (err) {

            console.log(err);

            setError(err);

        } finally {

            setLoading(false);
        }
    };

    // DELETE
    const deleteWorkout = async (id) => {

        try {

            await api.delete(`workouts/${id}/`);

            setWorkouts((prev) =>
                prev.filter((w) => w.id !== id)
            );

            return true;

        } catch (err) {

            console.log(err);

            return false;
        }
    };

    // USE EFFECT
    useEffect(() => {

        fetchWorkouts();

    }, []);

    return {
        workouts,
        loading,
        error,

        fetchWorkouts,
        deleteWorkout,
    };
}