"use client"
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ phone: null, isRegistered: false });

    const login = (phone, isRegistered) => {
        setUser({ phone, isRegistered });
    };

    const logout = () => {
        setUser({ phone: null, isRegistered: false });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);