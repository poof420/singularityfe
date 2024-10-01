"use client"

import React, { useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface Point {
  id: string
  x: number
  y: number
  size: number
  filled: boolean
  label: string
}

interface Connection {
  from: string
  to: string
  color: string
  thickness: number
}

const initialPoints: Point[] = [
  { id: '1', x: -2, y: 2, size: 0.2, filled: true, label: '11.5678' },
  { id: '2', x: 2, y: 2, size: 0.15, filled: false, label: '12.3454' },
  { id: '3', x: 0, y: 0, size: 0.25, filled: false, label: 'Phrase' },
  { id: '4', x: -1, y: -2, size: 0.18, filled: true, label: '9.8796' },
]

const initialConnections: Connection[] = [
  { from: '1', to: '2', color: '#ff00ff', thickness: 0.03 },
  { from: '1', to: '3', color: '#8000ff', thickness: 0.02 },
  { from: '2', to: '3', color: '#ff0000', thickness: 0.04 },
  { from: '3', to: '4', color: '#ff8000', thickness: 0.03 },
]

function Point({ point }: { point: Point }) {
  return (
    <group position={[point.x, point.y, 0]}>
      <mesh>
        <circleGeometry args={[point.size, 32]} />
        <meshBasicMaterial color="white" transparent opacity={point.filled ? 1 : 0.5} />
      </mesh>
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {point.label}
      </Text>
    </group>
  )
}

function Connection({ connection, points }: { connection: Connection; points: Point[] }) {
  const from = points.find(p => p.id === connection.from)
  const to = points.find(p => p.id === connection.to)

  if (!from || !to) return null

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array([from.x, from.y, 0, to.x, to.y, 0])
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    return geometry
  }, [from, to])

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={connection.color} linewidth={connection.thickness} />
    </line>
  )
}

export default function DynamicGraph() {
  const [points, setPoints] = useState<Point[]>(initialPoints)
  const [connections, setConnections] = useState<Connection[]>(initialConnections)

  const addRandomPoint = () => {
    const newId = (points.length + 1).toString()
    const newPoint: Point = {
      id: newId,
      x: Math.random() * 4 - 2,
      y: Math.random() * 4 - 2,
      size: Math.random() * 0.1 + 0.1,
      filled: Math.random() > 0.5,
      label: (Math.random() * 10).toFixed(4),
    }

    // Find the two closest points
    const sortedPoints = [...points].sort((a, b) => 
      Math.hypot(a.x - newPoint.x, a.y - newPoint.y) - Math.hypot(b.x - newPoint.x, b.y - newPoint.y)
    )
    const closestPoints = sortedPoints.slice(0, 2)

    // Create new connections
    const newConnections: Connection[] = closestPoints.map(point => ({
      from: newId,
      to: point.id,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      thickness: Math.random() * 0.03 + 0.01,
    }))

    setPoints([...points, newPoint])
    setConnections([...connections, ...newConnections])
  }

  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas>
        <ambientLight intensity={0.5} />
        {points.map(point => (
          <Point key={point.id} point={point} />
        ))}
        {connections.map((connection, index) => (
          <Connection key={index} connection={connection} points={points} />
        ))}
      </Canvas>
      <button
        className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded"
        onClick={addRandomPoint}
      >
        Add Random Point
      </button>
    </div>
  )
}