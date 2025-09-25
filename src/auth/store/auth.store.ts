import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { registerAction } from "../actions/register.action";

type AuthStatus = "authenticated" | "not-authenticated" | "cheking";

type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    // Getters
    isLoggedIn: () => boolean;
    isLoggedOut: () => boolean;
    isAuthChecking: () => boolean;
    isAdmin: () => boolean;

    // Actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
    register: (email: string, password: string, fullName: string) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: "cheking",
    isLoggedIn: () => get().authStatus === "authenticated",
    isLoggedOut: () => get().authStatus === "not-authenticated",
    isAuthChecking: () => get().authStatus === "cheking",
    isAdmin: () => {
        const roles = get().user?.roles || [];

        console.log("get().user", get().user);
        console.log("roles", roles);

        return roles.includes("admin");
    },
    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password);
            localStorage.setItem("token", data.token);

            set({ user: data.user, token: data.token, authStatus: "authenticated" });
            return true;
        } catch (err) {
            localStorage.removeItem("token");
            set({ user: null, token: null, authStatus: "not-authenticated" });
        }

        return false;
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null, authStatus: "not-authenticated" });
    },
    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction();
            set({
                user,
                token,
                authStatus: "authenticated",
            });

            return true;
        } catch (err) {
            set({
                user: undefined,
                token: undefined,
                authStatus: "not-authenticated",
            });
        }

        return false;
    },
    register: async (email: string, password: string, fullName: string) => {
        try {
            const data = await registerAction(email, password, fullName);
            localStorage.setItem("token", data.token);

            set({ user: data.user, token: data.token, authStatus: "authenticated" });
            return true;
        } catch (err) {
            localStorage.removeItem("token");
            set({ user: null, token: null, authStatus: "not-authenticated" });
        }

        return false;
    },
}));
