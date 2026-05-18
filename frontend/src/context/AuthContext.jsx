import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";


const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {

        try {

            const res = await api.get("accounts/me/");

            setUser(res.data);

        } catch(err) {

            setUser(null);

        } finally {

            setLoading(false);
        }
    };

    const login = async (username, password) => {
        const res = await api.post("accounts/login/", { username, password });
        localStorage.setItem("authToken", res.data.token);
        await fetchUser();
    };

    const logout = async () => {
        await api.post("accounts/logout/");
        localStorage.removeItem("authToken");
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider 
            value={{
                user,
                loading,

                login,
                logout,

                fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    return useContext(AuthContext);
}