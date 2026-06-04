// pages/ViewWorkouts.jsx

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
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState(null);

    const navigate = useNavigate();

    const {
        workouts,
        loading,
        deleteWorkout,
        updateWorkout,

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
    } = useWorkouts();

    // DELETE
    const handleDelete = async (id) => {
        const ok = await deleteWorkout(id);
        if (ok) {
            toast.success("Workout deleted");
        } else {
            toast.error("Something went wrong.");
        }
    };

    // EDIT
    const handleEditOpen = (workout) => {
        setEditId(workout.id);
        setEditData(JSON.parse(JSON.stringify(workout)));
    };

    const handleEditCancel = () => {
        setEditId(null);
        setEditData(null);
    };

    const handleEditSubmit = async (id) => {
        const ok = await updateWorkout(id, editData);
        if (ok) {
            toast.success("Workout updated!");
            setEditId(null);
            setEditData(null);
        } else {
            toast.error("Something went wrong.");
        }
    };

    const handleEditExerciseName = (exIndex, value) => {
        const updated = { ...editData };
        updated.exercises[exIndex].name_of_exercise = value;
        setEditData(updated);
    };

    const handleEditReps = (exIndex, setIndex, value) => {
        const updated = { ...editData };
        updated.exercises[exIndex].sets[setIndex].reps = value;
        setEditData(updated);
    };

    // PAGINACIJA — brojevi sa "..." za veliki broj stranica
    const getPageNumbers = () => {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
                return (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 2
                );
            })
            .reduce((acc, page, i, arr) => {
                if (i > 0 && page - arr[i - 1] > 1) {
                    acc.push("...");
                }
                acc.push(page);
                return acc;
            }, []);
    };

    return (
        <>
            <Header />

            <div className="page">
                <div className="content">
                    <div className="workouts-page">
                        <h1 className="h1">Your Workouts</h1>

                        {/* SEARCH / FILTER / SORT */}
                        <div className="workout-controls">
                            <input
                                type="text"
                                placeholder="Search exercises..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Week"
                                value={filterWeek}
                                min="1"
                                onChange={(e) => setFilterWeek(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Day"
                                value={filterDay}
                                min="1"
                                onChange={(e) => setFilterDay(e.target.value)}
                            />

                            <select
                                value={ordering}
                                onChange={(e) => setOrdering(e.target.value)}
                            >
                                <option value="-created_at">Newest first</option>
                                <option value="created_at">Oldest first</option>
                                <option value="week">Week ↑</option>
                                <option value="-week">Week ↓</option>
                                <option value="day">Day ↑</option>
                                <option value="-day">Day ↓</option>
                            </select>

                            {(search || filterWeek || filterDay) && (
                                <button
                                    className="clear-btn"
                                    onClick={() => {
                                        setSearch("");
                                        setFilterWeek("");
                                        setFilterDay("");
                                    }}
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>

                        {/* LOADING */}
                        {loading ? (
                            <Loading />
                        ) : workouts.length === 0 ? (
                            <div className="empty-state">
                                <h2>No workouts yet</h2>
                                <p>Start your fitness journey by creating your first workout.</p>
                                <button
                                    className="empty-btn"
                                    onClick={() => navigate("/createWorkout")}
                                >
                                    Create Workout
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="total-count">{totalCount} workouts total</p>

                                {workouts.map((workout) => (
                                    <div key={workout.id} className="workout-card">

                                        {editId === workout.id && editData ? (
                                            <div className="edit-form">
                                                <div className="edit-header">
                                                    <input
                                                        type="number"
                                                        placeholder="Week"
                                                        value={editData.week}
                                                        onChange={(e) =>
                                                            setEditData({ ...editData, week: e.target.value })
                                                        }
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Day"
                                                        value={editData.day}
                                                        onChange={(e) =>
                                                            setEditData({ ...editData, day: e.target.value })
                                                        }
                                                    />

                                                    <textarea
                                                        className="input-notes"
                                                        placeholder="Notes (optional"
                                                        value={editData.notes}
                                                        onChange={(e) => setEditData({...editData, notes: e.target.value})}
                                                    />
                                                </div>

                                                {editData.exercises.map((exercise, exIndex) => (
                                                    <div key={exIndex} className="exercise-section">
                                                        <input
                                                            type="text"
                                                            value={exercise.name_of_exercise}
                                                            onChange={(e) =>
                                                                handleEditExerciseName(exIndex, e.target.value)
                                                            }
                                                        />
                                                        <div className="sets-container">
                                                            {exercise.sets.map((set, setIndex) => (
                                                                <input
                                                                    key={setIndex}
                                                                    type="number"
                                                                    value={set.reps}
                                                                    onChange={(e) =>
                                                                        handleEditReps(exIndex, setIndex, e.target.value)
                                                                    }
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="edit-actions">
                                                    <button className="save-btn" onClick={() => handleEditSubmit(workout.id)}>
                                                        Save
                                                    </button>
                                                    <button className="cancel-btn" onClick={handleEditCancel}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="workout-top">
                                                    <h2>Week {workout.week} - Day {workout.day}</h2>
                                                </div>
                                                {workout.notes && (
                                                    <p className="workout-notes">{workout.notes}</p>
                                                )}

                                                {workout.exercises.map((exercise) => (
                                                    <div key={exercise.id} className="exercise-section">
                                                        <h3>{exercise.name_of_exercise}</h3>
                                                        <div className="sets-container">
                                                            {exercise.sets.map((set) => (
                                                                <div key={set.id} className="set-box">
                                                                    {set.reps} reps
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="card-actions">
                                                    <button className="edit-button" onClick={() => handleEditOpen(workout)}>
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="delete_button"
                                                        onClick={() => setDeleteId(workout.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}

                                {/* PAGINACIJA */}
                                {totalPages > 1 && (
                                    <div className="pagination">
                                        <button
                                            disabled={!hasPrev}
                                            onClick={() => goToPage(currentPage - 1)}
                                        >
                                            ← Prev
                                        </button>

                                        {getPageNumbers().map((page, i) =>
                                            page === "..." ? (
                                                <span key={`dots-${i}`} className="pagination-dots">
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => goToPage(page)}
                                                    className={page === currentPage ? "page-btn active" : "page-btn"}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        )}

                                        <button
                                            disabled={!hasNext}
                                            onClick={() => goToPage(currentPage + 1)}
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

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