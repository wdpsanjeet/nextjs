// app/components/MatchCard.js

import Link from 'next/link';
import Image from 'next/image';

export default function MatchCard({ match }) {
  // Format match date to a more readable format
  const matchDate = new Date(match.date).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
console.log(match)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      {/* Match Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-800 p-4 text-white">
        <h3 className="text-sm font-semibold uppercase tracking-wider">
          IPL {new Date(match.date).getFullYear()}
        </h3>
        <p className="text-xs mt-1 opacity-80">
          {match.venue} • {matchDate} • {match.time}
        </p>
      </div>

      {/* Teams */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Team 1 */}
          <div className="flex flex-col items-center w-1/3">
            <div className="relative w-16 h-16 mb-2">
              <Image
                src={`http://localhost:3000/${match.teamALogo}` || '/team-placeholder.png'}
                alt={match.teamA}
                fill
                className="object-contain"
              />
            </div>
            <h4 className="text-center text-gray-700 font-medium text-sm md:text-base">
              {match.teamA}
            </h4>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center w-1/3">
            <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="font-bold text-gray-700">VS</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">T20 Match</p>
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center w-1/3">
            <div className="relative w-16 h-16 mb-2">
              <Image
                src={`http://localhost:3000/${match.teamBLogo}` || '/team-placeholder.png'}
                alt={match.teamB}
                fill
                className="object-contain"
              />
            </div>
            <h4 className="text-center text-gray-700 font-medium text-sm md:text-base">
              {match.teamB}
            </h4>
          </div>
        </div>

        {/* Match Info */}
        <div className="bg-gray-50 rounded-md p-3 text-center">
          <p className="text-xs text-gray-600">
            <span className="font-medium">{matchDate}</span> • {match.time} IST
          </p>
          <p className="text-xs text-gray-600 mt-1">{match.venue}</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-4">
        <Link
          href={`/book-tickets?matchId=${match.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-center py-2 rounded-md font-medium transition-colors duration-300"
        >
          Book Tickets
        </Link>
      </div>
    </div>
  );
}