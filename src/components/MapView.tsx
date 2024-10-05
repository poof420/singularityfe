"use client"

import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import * as THREE from 'three'
import processedMapResults from '../data/processed_map_results.json'

// Export the DataPoint type
export type DataPoint = {
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

// Use the imported JSON data
const data: DataPoint[] = processedMapResults

type Point = {
  position: [number, number, number]
  data: DataPoint
}

function DataPoints({
  selectedPoint,
  setSelectedPoint,
  focusOnPoint,
}: {
  selectedPoint: DataPoint | null
  setSelectedPoint: React.Dispatch<React.SetStateAction<DataPoint | null>>
  focusOnPoint: (point: DataPoint) => void
}) {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null)
  const [lines, setLines] = useState<JSX.Element[]>([])

  // Generate points from data
  const points: Point[] = useMemo(() => {
    return data.map((item) => ({
      position: [item.umap_1, item.umap_2, item.umap_3] as [number, number, number],
      data: item,
    }))
  }, [])

  const handlePointerOver = useCallback(
    (dataPoint: DataPoint, position: [number, number, number]) => {
      setHoveredPoint(dataPoint)
      // Any additional logic for pointer over
    },
    []
  )

  const handlePointerOut = useCallback(() => {
    setHoveredPoint(null)
    // Any additional logic for pointer out
  }, [])

  const handleClick = useCallback(
    (dataPoint: DataPoint) => {
      setSelectedPoint(dataPoint)
      focusOnPoint(dataPoint) // Use the function to focus camera
    },
    [setSelectedPoint, focusOnPoint]
  )

  return (
    <>
      {points.map((point: Point, i: number) => (
        <mesh
          key={i}
          position={point.position}
          onPointerOver={() => handlePointerOver(point.data, point.position)}
          onPointerOut={handlePointerOut}
          onClick={() => handleClick(point.data)}
        >
          {/* Render your point geometry and material */}
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={
              selectedPoint && selectedPoint.id === point.data.id
                ? 'red'
                : hoveredPoint && hoveredPoint.id === point.data.id
                ? 'yellow'
                : 'orange'
            }
          />
        </mesh>
      ))}
      {lines}
    </>
  )
}

export default function MapView({
  selectedPoint,
  setSelectedPoint,
  focusOnPoint,
}: {
  selectedPoint: DataPoint | null
  setSelectedPoint: React.Dispatch<React.SetStateAction<DataPoint | null>>
  focusOnPoint: (point: DataPoint) => void
}) {
  const controlsRef = useRef<CameraControls>(null)

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

  // Function to focus the camera on a specific point
  const focusCameraOnPoint = useCallback((point: DataPoint) => {
    if (controlsRef.current) {
      const targetPosition = new THREE.Vector3(point.umap_1, point.umap_2, point.umap_3)
      controlsRef.current.setLookAt(
        targetPosition.x + 2, targetPosition.y + 2, targetPosition.z + 2,
        targetPosition.x, targetPosition.y, targetPosition.z,
        true
      )
    }
  }, [])

  // Add useEffect to listen for changes in selectedPoint
  useEffect(() => {
    if (selectedPoint) {
      focusCameraOnPoint(selectedPoint)
    }
  }, [selectedPoint, focusCameraOnPoint])

  return (
    <div className="w-full h-full bg-black">
      <Canvas camera={{ position: cameraPosition, fov: 60 }}>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <CameraControls ref={controlsRef} />
        <DataPoints
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          focusOnPoint={focusCameraOnPoint} // Pass function to DataPoints
        />
      </Canvas>
    </div>
  )
}