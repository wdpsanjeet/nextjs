'use client';

export default function SeatSelector({ selectedSeats, onSeatSelect, maxSeats = 6 }) {
  const sections = [
    {
      name: 'Premium Stand',
      price: 2500,
      rows: [
        ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
      ],
      color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    {
      name: 'General Stand',
      price: 1200,
      rows: [
        ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
        ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
      ],
      color: 'bg-green-100 border-green-300 text-green-800'
    },
    {
      name: 'Economy Stand',
      price: 800,
      rows: [
        ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
        ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'],
      ],
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
    }
  ];

  const handleSeatClick = (seat, section) => {
    const seatData = { seat, price: section.price, section: section.name };
    const isSelected = selectedSeats.some(s => s.seat === seat);
    
    if (isSelected) {
      onSeatSelect(selectedSeats.filter(s => s.seat !== seat));
    } else if (selectedSeats.length < maxSeats) {
      onSeatSelect([...selectedSeats, seatData]);
    }
  };

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} className={`p-4 rounded-lg border ${section.color}`}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">
              {section.name} - ₹{section.price}
            </h3>
            <span className="text-xs bg-white/70 px-2 py-1 rounded-full">
              {selectedSeats.filter(s => s.section === section.name).length} selected
            </span>
          </div>
          
          {section.rows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-wrap gap-2 mb-2">
              {row.map(seat => {
                const isSelected = selectedSeats.some(s => s.seat === seat);
                const isDisabled = selectedSeats.length >= maxSeats && !isSelected;
                
                return (
                  <button
                    key={seat}
                    type="button"
                    onClick={() => handleSeatClick(seat, section)}
                    disabled={isDisabled}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border-2 font-medium ${
                      isSelected 
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : isDisabled
                          ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-indigo-400 hover:bg-indigo-50'
                    }`}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ))}
      
      <div className="text-sm text-gray-600 mt-4">
        <p>Selected seats: {selectedSeats.map(s => s.seat).join(', ') || 'None'}</p>
        <p className="font-medium mt-1">
          Total: ₹{selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
        </p>
        <p className="text-xs mt-2 text-gray-500">
          Maximum {maxSeats} tickets per booking
        </p>
      </div>
    </div>
  );
}