'use client';

import { Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadMatches } from '../store/slices/matchSlice';
import MatchCard from '../components/MatchCard';
import Header from '../components/Header';
import Loader from '../components/Loader';

export default function MatchesPage() {
  const dispatch = useAppDispatch();
  const { matches, loading, error } = useAppSelector((state) => state.matches);

  useEffect(() => {
    dispatch(loadMatches());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1e3c] to-[#0b2b5a] text-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Upcoming Matches</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
        </div>
      </div>
    </div>
  );
}
