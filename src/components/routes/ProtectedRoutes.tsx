import { useAuthStore } from "@/auth/store/auth.store";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const { isLoggedOut } = useAuthStore();

    if (isLoggedOut()) {
        return <Navigate to="/auth/login" />;
    }

    return children;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const { isLoggedIn, isAuthChecking } = useAuthStore();

    if (isAuthChecking()) {
        return null;
    }

    if (isLoggedIn()) {
        return <Navigate to="/" />;
    }

    return children;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
    const { isLoggedOut, isAdmin, isAuthChecking } = useAuthStore();

    if (isAuthChecking()) {
        return null;
    }

    if (isLoggedOut()) {
        return <Navigate to="/auth/login" />;
    }

    if (!isAdmin()) {
        return <Navigate to="/" />;
    }

    return children;
};
