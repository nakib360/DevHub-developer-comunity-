"use client"
import { SignOut } from "@/app/(Auth)/AuthActions";
import { useAuth } from "@/app/(Auth)/AuthProvider";
import Link from "next/link";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

const AuthBtns = () => {
    const { user, loading } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = () => {
        SignOut();
        setShowConfirm(false);
    };

    if (loading) return null;

    return (
        <div>
            {user ? (
                <div className="flex gap-2 items-center">
                    <div className="w-9 h-9 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-semibold uppercase">
                        {user.email?.charAt(0)}
                    </div>
                    <button onClick={() => setShowConfirm(true)} className="cursor-pointer">
                        <FiLogOut className="text-xl text-gray-600 hover:text-red-500" />
                    </button>
                </div>
            ) : (
                <div className="flex gap-2 items-center">
                    <Link href={"/Login"} className="cursor-pointer">Sign in</Link>
                    <Link href={"/SignUp"} className="bg-blue-600 px-3 py-2 rounded-sm text-white">Get started</Link>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirm && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out]"
                    onClick={() => setShowConfirm(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-80 shadow-xl animate-[scaleIn_0.2s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-semibold text-gray-800">Do you want to sign out</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            you will be signed out from your account 
                        </p>
                        <div className="flex gap-2 justify-end mt-5">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="cursor-pointer px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthBtns;