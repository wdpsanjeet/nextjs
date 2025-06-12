// app/auth/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../store/hooks';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)
        fetchData();
    };
    const fetchData = async () => {
        setError('');
        dispatch(loginStart());
        try {
            const response = await fetch('https://raw.githubusercontent.com/wdpsanjeet/reactnative/refs/heads/main/user.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();

            if (email == json.email && password == json.password) {
                const User = {
                    id: 'user_' + Math.random().toString(36).substring(2, 9),
                    name: email.split('@')[0],
                    email,
                    token: 'mock_token_' + Math.random().toString(36).substring(2),
                };
                dispatch(loginSuccess(User));
                toast.success('Login Success!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                router.push('/matches');
            } else {
                toast.error('Login Failed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setError(error.message);
                dispatch(loginFailure(error.message));
            }
        } catch (error) {
            setError(error.message);
            dispatch(loginFailure(error.message));
        } finally {
            setError('');
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#051937] to-[#0b2b5a] text-white">
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
            {/* Mobile Header (shown only on small screens) */}
            <header className="md:hidden p-4 flex items-center justify-center">
                <div className="flex items-center space-x-3">
                    <Image
                        src="/assets/ipl-logo.png"
                        alt="IPL Logo"
                        width={60}
                        height={60}
                        className="full"
                    />
                    <h1 className="text-xl font-bold">IPL Ticket Booking</h1>
                </div>
            </header>

            <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center min-h-screen">
                {/* Left Side (Logo & Description) - Desktop */}
                <div className="hidden md:flex flex-col items-start justify-center w-1/2 pr-12">
                    <div className="mb-8">
                        <Image
                            src="/assets/ipl-logo.png"
                            alt="IPL Logo"
                            width={120}
                            height={120}
                            className="full mb-6"
                        />
                        <h1 className="text-4xl font-bold mb-4">IPL 2024 Ticket Booking</h1>
                        <p className="text-lg text-gray-300">
                            Book your seats for the most exciting cricket matches of the season.
                            Don't miss the action - secure your tickets today!
                        </p>
                    </div>
                </div>

                {/* Right Side (Form) */}
                <div className="w-full md:w-1/2 max-w-md">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                        {/* Mobile Description (shown only on small screens) */}
                        <div className="md:hidden mb-6 text-center">
                            <h2 className="text-2xl font-bold mb-2">
                                {isLogin ? 'Welcome Back!' : 'Create Account'}
                            </h2>
                            <p className="text-gray-300">
                                {isLogin ? 'Login to book your tickets' : 'Join us to book IPL tickets'}
                            </p>
                        </div>

                        {/* Auth Tabs */}
                        <div className="flex mb-6 bg-white/10 rounded-full p-1">
                            <button
                                className={`flex-1 py-2 rounded-full transition-colors ${isLogin ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </button>
                            <button
                                className={`flex-1 py-2 rounded-full transition-colors ${!isLogin ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}
                                onClick={() => setIsLogin(false)}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-500/20 text-red-200 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="••••••••"
                                    required
                                    minLength="6"
                                />
                            </div>

                            {isLogin && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember"
                                            name="remember"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember" className="ml-2 text-sm">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link href="/forgot-password" className="text-sm text-indigo-300 hover:text-indigo-200">
                                        Forgot password?
                                    </Link>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                            >
                                {isLogin ? 'Login' : 'Sign Up'}
                            </button>
                        </form>

                        {/* Social Login */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-5 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-transparent text-white/70">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm text-sm font-medium bg-white/5 hover:bg-white/10"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.798-1.677-4.188-2.699-6.735-2.699-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm text-sm font-medium bg-white/5 hover:bg-white/10"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {!isLogin && (
                            <p className="mt-4 text-center text-sm text-white/70">
                                Already have an account?{' '}
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className="text-indigo-300 hover:text-indigo-200 font-medium"
                                >
                                    Login here
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}