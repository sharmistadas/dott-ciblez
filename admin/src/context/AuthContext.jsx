import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiRequest } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    useEffect(() => {
        const bootstrap = async () => {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await apiRequest('/api/auth/me', { method: 'GET' });
                const admin = response?.data?.admin;
                if (admin) {
                    setUser(admin);
                    localStorage.setItem('adminUser', JSON.stringify(admin));
                } else {
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminUser');
                }
            } catch (_err) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
            } finally {
                setLoading(false);
            }
        };

        bootstrap();
    }, []);

    const login = async (email, password) => {
        setAuthLoading(true);
        try {
            const response = await apiRequest('/api/auth/login', {
                method: 'POST',
                body: { email, password },
                withAuth: false,
            });

            const admin = response?.data?.admin;
            const token = response?.data?.token;

            if (token) {
                localStorage.setItem('adminToken', token);
            }
            if (admin) {
                localStorage.setItem('adminUser', JSON.stringify(admin));
                setUser(admin);
            }

            return { success: true };
        } catch (err) {
            return { success: false, error: err.message || 'Login failed' };
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = async () => {
        try {
            await apiRequest('/api/auth/logout', { method: 'POST' });
        } catch (_err) {
            // Ignore logout failures and clear local state anyway
        } finally {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            setUser(null);
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        setAuthLoading(true);
        try {
            await apiRequest('/api/auth/change-password', {
                method: 'PUT',
                body: { currentPassword, newPassword },
            });
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message || 'Unable to update password' };
        } finally {
            setAuthLoading(false);
        }
    };

    const value = { user, login, logout, changePassword, loading, authLoading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
