import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
            } catch (err) {
                alert("Unauthorized");
                window.location.href = "/login";
            }
        };
        fetchUser();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {user && <p>Welcome, {user.username} (Role: {user.role})</p>}
        </div>
    );
};

export default Dashboard;
