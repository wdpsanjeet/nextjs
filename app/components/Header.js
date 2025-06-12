'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();  
  const router = useRouter();
  

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth');
  };

  return (
    <header className="bg-indigo-900 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            IPL Tickets
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/matches"
              className={`hover:text-yellow-300 transition-colors ${
                pathname === '/matches' ? 'text-yellow-300 font-medium' : ''
              }`}
            >
              Matches
            </Link>
            {user && (
              <Link
                href="/my-bookings"
                className={`hover:text-yellow-300 transition-colors ${
                  pathname === '/my-bookings' ? 'text-yellow-300 font-medium' : ''
                }`}
              >
                My Bookings
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden sm:inline text-sm">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}