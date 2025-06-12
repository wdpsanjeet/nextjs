'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/slices/authSlice';
import Link from 'next/link';
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
      // Mock authentication - in a real app, this would call your API
      const mockUser = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0],
        email,
        token: 'mock_token_' + Math.random().toString(36).substring(2),
      };
      
      dispatch(loginSuccess(mockUser));
      router.push('/matches');
    } catch (err) {
      dispatch(loginFailure(err.message || 'Login failed'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"> */}
          <AuthForm />
        {/* </div>
      </main> */}
    </div>
  );
}