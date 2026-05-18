import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function useWorkouts() {

    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // PAGINACIJA — sve iz backenda
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    // SEARCH / FILTER / SORT
    const [search, setSearch] = useState("");
    const [filterWeek, setFilterWeek] = useState("");
    const [filterDay, setFilterDay] = useState("");
    const [ordering, setOrdering] = useState("-created_at");

    // FETCH
    const fetchWorkouts = async (page = 1) => {
        try {
            setLoading(true);

            const params = { page, ordering };

            if (search) params.search = search;
            if (filterWeek) params.week = filterWeek;
            if (filterDay) params.day = filterDay;

            const res = await api.get("workouts/", { params });

            setWorkouts(res.data.results);
            setTotalCount(res.data.count);
            setTotalPages(res.data.total_pages);
            setHasNext(res.data.next !== null);
            setHasPrev(res.data.previous !== null);
            setCurrentPage(page);

        } catch (err) {
            console.log(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // UPDATE
    const updateWorkout = async (id, data) => {
        try {
            const res = await api.put(`workouts/${id}/`, data);
            setWorkouts((prev) =>
                prev.map((w) => (w.id === id ? res.data : w))
            );
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    // DELETE
    const deleteWorkout = async (id) => {
        try {
            await api.delete(`workouts/${id}/`);
            setWorkouts((prev) => prev.filter((w) => w.id !== id));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        fetchWorkouts(page);
    };

    useEffect(() => {
        fetchWorkouts(1);
    }, [search, filterWeek, filterDay, ordering]);

    return {
        workouts,
        loading,
        error,

        currentPage,
        totalPages,
        totalCount,
        hasPrev,
        hasNext,
        goToPage,

        search,
        setSearch,
        filterWeek,
        setFilterWeek,
        filterDay,
        setFilterDay,
        ordering,
        setOrdering,

        fetchWorkouts,
        updateWorkout,
        deleteWorkout,
    };
}