import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function useFetchUser() {
    
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUser = async () => {

            try {
                
                const res = await api.get("accounts/me/");

                setUser(res.data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading};
}