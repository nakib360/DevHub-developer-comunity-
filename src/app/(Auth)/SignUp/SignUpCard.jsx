"use client"
import React, { useState } from 'react';
import { SignInWithGoogle, SignUp } from '../AuthActions';
import { useRouter } from 'next/navigation';
import { updateProfile } from 'firebase/auth';
import Link from 'next/link';

export default function SignUpCard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);


  // Password Validation Rules
  const passwordCriteria = {
    minLength: formData.password.length >= 8,
    hasUpper: /[A-Z]/.test(formData.password),
    hasLower: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
  const doPasswordsMatch = formData.password.length > 0 && formData.password === formData.confirmPassword;

  const isFormValid =
    formData.fullName.trim() !== '' &&
    formData.username.trim() !== '' &&
    formData.email.trim() !== '' &&
    isPasswordValid &&
    doPasswordsMatch &&
    formData.agreeTerms;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError('');
    setIsSubmitting(true);

    try {
      const user = await SignUp(formData.email, formData.password);

      // fullName টা Firebase profile-এ সেভ করছি
      await updateProfile(user, { displayName: formData.fullName });

      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
      });

      router.push("/");
    } catch (err) {
      console.log(err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Firebase error code-কে বাংলা/সহজ মেসেজে রূপান্তর
  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'এই ইমেইল দিয়ে আগে থেকেই একাউন্ট আছে।';
      case 'auth/invalid-email':
        return 'ইমেইল ঠিকানাটি সঠিক নয়।';
      case 'auth/weak-password':
        return 'পাসওয়ার্ড খুব দুর্বল।';
      case 'auth/popup-closed-by-user':
        return 'Google সাইনআপ উইন্ডোটি বন্ধ করা হয়েছে।';
      case 'auth/account-exists-with-different-credential':
        return 'এই ইমেইলের জন্য অন্য একটি সাইন-ইন পদ্ধতি ব্যবহার করা হয়েছে।';
      default:
        return 'সাইনআপ ব্যর্থ হয়েছে, আবার চেষ্টা করুন।';
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-slate-100 my-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#3b2bee] mb-1">DevHub</h1>
          <p className="text-slate-500 text-sm">Join the developer community</p>
        </div>

        {/* Social Sign Up Buttons */}
        <div>

          <button
            onClick={handleGoogle}
            type="button"
            disabled={isGoogleLoading}
            className="w-full cursor-pointer flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            {isGoogleLoading ? '......' : <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>

              Sign up with Google
            </>
            }
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-slate-200"></div>
          <span className="absolute bg-white px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            OR SIGN UP WITH EMAIL
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3b2bee]/20 focus:border-[#3b2bee] text-slate-800 placeholder-slate-400 text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="janedoe99"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3b2bee]/20 focus:border-[#3b2bee] text-slate-800 placeholder-slate-400 text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3b2bee]/20 focus:border-[#3b2bee] text-slate-800 placeholder-slate-400 text-sm transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3b2bee]/20 focus:border-[#3b2bee] text-slate-800 placeholder-slate-400 text-sm transition-all"
              required
            />

            <div className="mt-2 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
              <div className={passwordCriteria.minLength ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                {passwordCriteria.minLength ? '✓' : '•'} At least 8 characters
              </div>
              <div className={passwordCriteria.hasUpper ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                {passwordCriteria.hasUpper ? '✓' : '•'} One uppercase letter
              </div>
              <div className={passwordCriteria.hasLower ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                {passwordCriteria.hasLower ? '✓' : '•'} One lowercase letter
              </div>
              <div className={passwordCriteria.hasNumber ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                {passwordCriteria.hasNumber ? '✓' : '•'} One number digit
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Retype Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3b2bee]/20 focus:border-[#3b2bee] text-slate-800 placeholder-slate-400 text-sm transition-all"
              required
            />
            {formData.confirmPassword && (
              <p className={`text-[11px] mt-1 ${doPasswordsMatch ? 'text-emerald-600' : 'text-red-500'}`}>
                {doPasswordsMatch ? '✓ Passwords match' : '✕ Passwords do not match'}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#3b2bee] focus:ring-[#3b2bee] cursor-pointer"
              required
            />
            <label htmlFor="agreeTerms" className="text-[12px] text-slate-500 select-none cursor-pointer">
              I agree to the{' '}
              <a href="#" className="text-[#3b2bee] hover:underline">
                Terms
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#3b2bee] hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full mt-2 py-3 px-4 text-white font-medium text-sm rounded-xl transition-all shadow-sm ${isFormValid && !isSubmitting
              ? 'bg-[#3b2bee] hover:bg-[#3223d6] cursor-pointer opacity-100'
              : 'bg-[#3b2bee] opacity-40 cursor-not-allowed'
              }`}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center pt-4 border-t border-slate-100 text-sm text-slate-600">
          Already have an account?{' '}
          <Link href="/Login" className="font-semibold text-[#3b2bee] hover:underline">
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
}
