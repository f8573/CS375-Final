import { isAuthenticated } from "./authService.js";

export function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = "/login.html";
    }
}

export function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = "/dashboard.html";
    }
}
