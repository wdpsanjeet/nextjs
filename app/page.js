'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loadMatches } from './store/slices/matchSlice';
import Header from './components/Header';
import MatchCard from './components/MatchCard';

export default function Home() {
  const dispatch = useAppDispatch();
  const { matches, loading } = useAppSelector((state) => state.matches);
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(loadMatches());
  }, [dispatch]);

  useEffect(() => {
    if (matches.length > 0) {
      // Get 4 featured matches
      setFeaturedMatches(matches.slice(0, 4));
    }
  }, [matches]);

  const upcomingMatches = matches.filter(match => new Date(`${match.date}T${match.time}`) > new Date());
  const liveMatches = matches.filter(match => {
    const matchTime = new Date(`${match.date}T${match.time}`);
    const now = new Date();
    return now > matchTime && now < new Date(matchTime.getTime() + 4 * 60 * 60 * 1000);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1e3c] to-[#0b2b5a] text-white">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pb-32 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/10 to-indigo-900/20 z-10"></div>
          <Image 
            src="/assets/IPL2.webp" 
            alt="Stadium Background"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Book Your <span className="text-yellow-400">IPL 2024</span> Tickets
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
              Experience the thrill of live cricket! Secure your seats for the most exciting matches of the season with our easy booking platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/matches" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Tickets Now
              </Link>
              <Link 
                href="#featured-matches" 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300"
              >
                View Live Matches
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Matches Section */}
      <section id="featured-matches" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Matches</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Don't miss these exciting upcoming clashes. Book your tickets early to secure the best seats!
            </p>
          </div>

          {/* Match Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-1">
              <button
                className={`px-6 py-2 rounded-full transition-all ${activeTab === 'upcoming' ? 'bg-yellow-500 text-black font-medium' : 'hover:bg-white/20'}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={`px-6 py-2 rounded-full transition-all ${activeTab === 'live' ? 'bg-yellow-500 text-black font-medium' : 'hover:bg-white/20'}`}
                onClick={() => setActiveTab('live')}
              >
                Live Now
              </button>
              <button
                className={`px-6 py-2 rounded-full transition-all ${activeTab === 'all' ? 'bg-yellow-500 text-black font-medium' : 'hover:bg-white/20'}`}
                onClick={() => setActiveTab('all')}
              >
                All Matches
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
              <p className="mt-4">Loading matches...</p>
            </div>
          ) : (
            <>
              {/* Mobile view - horizontal scroll */}
              <div className="md:hidden overflow-x-auto pb-4">
                <div className="flex space-x-4" style={{ minWidth: `${featuredMatches.length * 300}px` }}>
                  {(activeTab === 'upcoming' ? upcomingMatches : activeTab === 'live' ? liveMatches : featuredMatches)
                    .slice(0, 4)
                    .map((match) => (
                      <div key={match.id} className="w-80 flex-shrink-0">
                        <MatchCard match={match} />
                      </div>
                    ))}
                </div>
              </div>

              {/* Desktop view - grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(activeTab === 'upcoming' ? upcomingMatches : activeTab === 'live' ? liveMatches : featuredMatches)
                  .slice(0, 4)
                  .map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
              </div>
            </>
          )}

          <div className="text-center mt-10">
            <Link 
              href="/matches" 
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
            >
              View All Matches
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0b2b5a] to-[#0a1e3c]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Booking your IPL tickets has never been easier. Follow these simple steps to secure your seats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Choose Match', 
                description: 'Browse upcoming matches and select your preferred game', 
                icon: '🎯' 
              },
              { 
                title: 'Select Seats', 
                description: 'Pick your seats from our interactive stadium map', 
                icon: '💺' 
              },
              { 
                title: 'Secure Payment', 
                description: 'Pay securely with multiple payment options', 
                icon: '💳' 
              },
              { 
                title: 'Get Tickets', 
                description: 'Receive e-tickets instantly via email and SMS', 
                icon: '🎫' 
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
                <div className="mt-4 text-yellow-400 font-bold text-sm">
                  Step {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Download Our Mobile App</h2>
                <p className="text-gray-200 mb-6 max-w-xl">
                  Get the best IPL ticket booking experience on your mobile device. Exclusive app-only discounts and features!
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center bg-black text-white py-3 px-6 rounded-lg">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                      <path d="M17.05 12.04C17.02 15.27 19.61 16.5 19.63 16.5C19.59 16.65 19.16 18.02 18.11 19.41C17.25 20.58 16.33 21.79 15.01 21.83C13.73 21.87 13.33 20.96 11.81 20.96C10.29 20.96 9.83 21.79 8.63 21.87C7.33 21.93 6.3 20.58 5.42 19.41C3.66 17.05 2.29 13.12 4.14 9.85C5.03 8.26 6.62 7.28 8.34 7.28C9.69 7.28 10.91 8.1 11.77 8.1C12.58 8.1 14.03 7.18 15.62 7.37C16.32 7.39 18.08 7.64 19.1 9.19C19.03 9.23 17.09 10.45 17.05 12.04ZM14.94 5.5C15.58 4.71 16.06 3.61 15.93 2.5C14.96 2.54 13.82 3.14 13.17 3.94C12.59 4.65 12.01 5.79 12.16 6.85C13.22 6.93 14.29 6.29 14.94 5.5Z" fill="currentColor"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="font-bold">App Store</div>
                    </div>
                  </button>
                  <button className="flex items-center bg-black text-white py-3 px-6 rounded-lg">
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                      <path d="M3 20.5V3.5C3 2.67 3.67 2 4.5 2H13L18 7V20.5C18 21.33 17.33 22 16.5 22H4.5C3.67 22 3 21.33 3 20.5ZM15 17H16.5V8.5H12V4H5V17H15ZM7 12H14V13.5H7V12ZM7 15H14V16.5H7V15Z" fill="currentColor"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="font-bold">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-96">
                  <Image 
                    src="/assets/mobile.jpeg"
                    alt="Mobile App Screens"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#0a1e3c] border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image 
                  src="/assets/ipl-logo.png" 
                  alt="IPL Logo" 
                  width={40} 
                  height={40} 
                  className="rounded-full mr-3"
                />
                <h3 className="text-xl font-bold">IPL Tickets</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted platform for booking IPL match tickets. Fast, secure, and reliable.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-current rounded-full"></div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Matches', 'My Bookings', 'Stadiums', 'Offers', 'FAQs'].map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Teams</h4>
              <ul className="space-y-2">
                {[
                  'Mumbai Indians', 'Chennai Super Kings', 
                  'Royal Challengers Bangalore', 'Kolkata Knight Riders',
                  'Delhi Capitals', 'Punjab Kings', 
                  'Rajasthan Royals', 'Sunrisers Hyderabad'
                ].map((team) => (
                  <li key={team}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {team}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to get updates on match schedules and exclusive offers.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-r-lg transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 IPL Ticket Booking. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}