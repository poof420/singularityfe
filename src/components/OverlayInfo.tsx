import React from 'react'
// Correct the import path and import the DataPoint type
import { DataPoint } from '@/components/ScatterPlot3DOriginal'

interface OverlayInfoProps {
  point: DataPoint | null
  onClose: () => void
}

export default function OverlayInfo({ point, onClose }: OverlayInfoProps) {
  if (!point) return null

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50 font-atkinson">
      <div
        className="relative p-4 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(255,140,0,0.8), rgba(255,40,0,0.4))',
          border: '2px solid #FF8C00',
          borderRadius: '4px', // Adjusted for sharper edges
          // You can set this to '0px' for square corners
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white font-bold"
          style={{ fontFamily: 'Atkinson Hyperlegible, sans-serif' }}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 text-white uppercase">Point Details</h2>
        <p className="mb-2 text-white">{point.content}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white">Scores:</h3>
          <ul className="list-disc list-inside text-white">
            {Object.entries(point.scores).map(([key, value]: [string, number]) => (
              <li key={key}>
                <span className="capitalize">{key.replace('_', ' ')}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}