"use client"
import React, { useState } from 'react';

export default function LoginCard() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // Realtime check: Valid email format + password length requirement
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isPasswordValid = formData.password.trim().length >= 6; // Requires at least 6 characters
  
  // Entire form must meet conditions to unlock the button
  const isFormValid = isEmailValid && isPasswordValid;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log('Login Submitted:', formData);

    // Reset Form State
    setFormData({
      email: '',
      password: '',
      rememberMe: false,
    });
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

          {/* Submit Button (Fades & Disables until all conditions pass) */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 px-4 bg-[#3b2bee] text-white font-medium text-sm rounded-xl transition-all shadow-sm ${
              isFormValid
                ? 'hover:bg-[#3223d6] opacity-100 cursor-pointer'
                : 'opacity-40 cursor-not-allowed'
            }`}
          >
            Sign in
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
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 text-slate-800 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </button>

          <button
            type="button"
            className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Google
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-600">
          Don&apos;t have an account?{' '}
          <a href="#" className="font-semibold text-[#3b2bee] hover:underline">
            Create an account
          </a>
        </div>

      </div>
    </div>
  );
}