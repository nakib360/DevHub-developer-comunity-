"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SignIn, SignInWithGoogle } from '../AuthActions';
import Link from 'next/link';

export default function LoginCard() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Realtime check: Valid email format + password length requirement
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isPasswordValid = formData.password.trim().length >= 6;

  const isFormValid = isEmailValid && isPasswordValid;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
        return 'ইমেইল অথবা পাসওয়ার্ড ভুল।';
      case 'auth/user-not-found':
        return 'এই ইমেইল দিয়ে কোনো একাউন্ট পাওয়া যায়নি।';
      case 'auth/too-many-requests':
        return 'অনেকবার চেষ্টা করা হয়েছে, কিছুক্ষণ পর আবার চেষ্টা করুন।';
      case 'auth/invalid-email':
        return 'ইমেইল ঠিকানাটি সঠিক নয়।';
      default:
        return 'লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন।';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError('');
    setIsSubmitting(true);

    try {
      await SignIn(formData.email, formData.password);

      setFormData({
        email: '',
        password: '',
        rememberMe: false,
      });

      router.push("/");
    } catch (err) {
      console.log(err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setIsGoogleLoading(true);

    try {
      await SignInWithGoogle();
      router.push("/");
    } catch (err) {
      console.log(err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f2f9] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-slate-100">

        {/* Header Icon & Title */}
        <div className="text-center mb-8 flex flex-col items-center">
          <h1 className="text-xl font-bold text-[#3b2bee] mb-2">DevHub</h1>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm">Log in to your account to continue</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                placeholder="developer@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3b2bee]/20 focus:border-[#3b2bee] text-slate-800 placeholder-slate-400 text-sm transition-all"
                required
              />
            </div>
            {formData.email && !isEmailValid && (
              <p className="text-[11px] text-red-500 mt-1">Please enter a valid email address.</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3b2bee]/20 focus:border-[#3b2bee] text-slate-800 placeholder-slate-400 text-sm transition-all"
                required
              />
            </div>
            {formData.password && !isPasswordValid && (
              <p className="text-[11px] text-red-500 mt-1">Password must be at least 6 characters.</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-600 select-none cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-[#3b2bee] focus:ring-[#3b2bee] cursor-pointer"
              />
              Remember me
            </label>
            <a href="#" className="font-semibold text-[#3b2bee] hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3 px-4 bg-[#3b2bee] text-white font-medium text-sm rounded-xl transition-all shadow-sm ${isFormValid && !isSubmitting
              ? 'hover:bg-[#3223d6] opacity-100 cursor-pointer'
              : 'opacity-40 cursor-not-allowed'
              }`}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-slate-200"></div>
          <span className="absolute bg-white px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            OR CONTINUE WITH
          </span>
        </div>

        {/* Social Options Side-by-Side */}
        <div>

          <button
            onClick={handleGoogle}
            type="button"
            className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            {isGoogleLoading ? '...' : <>
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>

              Google
            </>
            }
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-600">
          Don&apos;t have an account?{' '}
          <Link href="/SignUp" className="font-semibold text-[#3b2bee] hover:underline">
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}