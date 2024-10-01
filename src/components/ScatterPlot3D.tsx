"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Html } from '@react-three/drei'
import * as THREE from 'three'

type DataPoint = {
  id: number
  run_id: string
  timestep: number
  umap_1: number
  umap_2: number
  umap_3: number
  content: string
  reasoning: string
  scores: {
    quirk: number
    coherence: number
    atmosphere: number
    sensory_focus: number
    narrative_pace: number
    contemporary_relevance: number
  }
  user_id: string
}

// Import the JSON data
import data from '../data/processed_map_results.json'

function Points({ onPointSelect }: { onPointSelect: (point: DataPoint | null) => void }) {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null)
  const controlsRef = useRef<CameraControls>(null)

  const points = useMemo(() => {
    return data.map((item: DataPoint) => ({
      position: new THREE.Vector3(item.umap_1, item.umap_2, item.umap_3),
      data: item,
    }))
  }, [])

  const handlePointerOver = useCallback((point: DataPoint) => {
    setHoveredPoint(point)
  }, [])

  const handlePointerOut = useCallback(() => {
    setHoveredPoint(null)
  }, [])

  const handleClick = useCallback((point: DataPoint) => {
    setSelectedPoint((prevPoint) => (prevPoint === point ? null : point))
    onPointSelect(point === selectedPoint ? null : point)

    if (controlsRef.current) {
      if (point === selectedPoint) {
        controlsRef.current.reset(true)
      } else {
        const targetPosition = new THREE.Vector3(point.umap_1, point.umap_2, point.umap_3)
        controlsRef.current.setLookAt(
          targetPosition.x + 2, targetPosition.y + 2, targetPosition.z + 2,
          targetPosition.x, targetPosition.y, targetPosition.z,
          true
        )
      }
    }
  }, [selectedPoint, onPointSelect])

  const getColor = useCallback((scores: DataPoint['scores']) => {
    const avgScore = (scores.quirk + scores.coherence + scores.contemporary_relevance) / 3
    return new THREE.Color().setHSL(avgScore / 10, 1, 0.5)
  }, [])

  return (
    <>
      <CameraControls ref={controlsRef} />
      <group>
        {points.map((point, i) => (
          <mesh
            key={i}
            position={point.position}
            onPointerOver={() => handlePointerOver(point.data)}
            onPointerOut={handlePointerOut}
            onClick={() => handleClick(point.data)}
          >
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial 
              color={
                point.data === selectedPoint 
                  ? "red" 
                  : point.data === hoveredPoint 
                    ? "yellow" 
                    : getColor(point.data.scores)
              } 
            />
          </mesh>
        ))}
      </group>
      {hoveredPoint && (
        <Html>
          <div
            style={{
              position: 'absolute',
              fontSize: '12px',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '10px',
              borderRadius: '5px',
              maxWidth: '200px',
              pointerEvents: 'none',
            }}
          >
            <p>Content: {hoveredPoint.content}</p>
            <p>Reasoning: {hoveredPoint.reasoning}</p>
          </div>
        </Html>
      )}
    </>
  )
}

function CubicGrid() {
  // You can implement the grid using Three.js helpers or custom geometries
  return (
    <group>
      {/* For example, using the GridHelper from Three.js */}
      <gridHelper args={[20, 20, 0x888888, 0x444444]} />
      {/* Optionally, add axes for better visualization */}
      <axesHelper args={[10]} />
    </group>
  )
}

export default function ScatterPlot3D() {
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null)

  const cameraPosition = useMemo(() => {
    if (data.length === 0) return [0, 0, 10] as [number, number, number]
    const sum = data.reduce(
      (acc, item) => {
        acc.x += item.umap_1
        acc.y += item.umap_2
        acc.z += item.umap_3
        return acc
      },
      { x: 0, y: 0, z: 0 }
    )
    const avg = {
      x: sum.x / data.length,
      y: sum.y / data.length,
      z: sum.z / data.length,
    }
    return [avg.x, avg.y + 5, avg.z + 10] as [number, number, number]
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: cameraPosition, fov: 60 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <CubicGrid />
        <Points onPointSelect={setSelectedPoint} />
      </Canvas>
      {selectedPoint && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            maxWidth: '300px',
          }}
        >
          <h3>Selected Point</h3>
          <p>Content: {selectedPoint.content}</p>
          <p>Reasoning: {selectedPoint.reasoning}</p>
          <p>Scores:</p>
          <ul>
            {Object.entries(selectedPoint.scores).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}