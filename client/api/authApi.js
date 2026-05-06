import { getToken, logout } from "../auth/authService.js";

const API_BASE_URL = `${window.location.origin}/api`;

async function authRequest(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        ...(options.auth && token ? { Authorization: `Bearer ${token}` } : {})
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 401) {
        logout();
        throw new Error(data.message || "Session expired. Please log in again.");
    }

    if (!response.ok) {
        throw new Error(data.message || data.error || "Request failed");
    }

    return data;
}

export function registerUser(userData) {
    return authRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
}

export function loginUser(credentials) {
    return authRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
    });
}

export function getCurrentUser() {
    return authRequest("/auth/me", {
        method: "GET",
        auth: true
    });
}
