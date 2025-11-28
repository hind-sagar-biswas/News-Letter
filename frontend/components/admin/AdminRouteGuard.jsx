"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminRouteGuard = ({ children }) => {
    const router = useRouter();
    const { user } = useSelector((state) => state.authData);

    useEffect(() => {
        // Check if user is not logged in
        if (!user) {
            toast.error("Please login to access admin panel");
            router.push("/");
            return;
        }

        // Check if user is not verified
        if (!user.isVerified) {
            toast.error("Please verify your email to access admin panel");
            router.push("/");
            return;
        }

        // Check if user is not admin
        if (!user.isAdmin) {
            toast.error("Access denied. Admin privileges required.");
            router.push("/");
            return;
        }
    }, [user, router]);

    // Show loading or nothing while checking
    if (!user || !user.isVerified || !user.isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#1e2761] to-[#131c45] text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
                    <p className="text-lg">Checking permissions...</p>
                </div>
            </div>
        );
    }

    return children;
};

export default AdminRouteGuard;
