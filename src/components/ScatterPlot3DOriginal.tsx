"use client"

import React, { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { CameraControls, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion-3d'
import processedMapResults from '../data/processed_map_results.json'
import OverlayInfo from './OverlayInfo'

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

function DataPoints({
  selectedPoint,
  setSelectedPoint,
}: {
  selectedPoint: DataPoint | null
  setSelectedPoint: React.Dispatch<React.SetStateAction<DataPoint | null>>
}) {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null)
  const controlsRef = useRef<CameraControls>(null)
  const [lines, setLines] = useState<JSX.Element[]>([])

  // Color scale function using three attributes
  const colorScale = useMemo(() => {
    return (scores: DataPoint['scores']) => {
      const attribute1 = scores.quirk
      const attribute2 = scores.coherence
      const attribute3 = scores.atmosphere

      // Normalize scores to 0-1 range
      const normalized1 = attribute1 / 10
      const normalized2 = attribute2 / 10
      const normalized3 = attribute3 / 10

      // Map to RGB color
      const color = new THREE.Color(normalized1, normalized2, normalized3)
      return color
    }
  }, [])

  const points = useMemo(() => {
    return data.map((item) => {
      // Calculate an average score for size scaling
      const averageScore =
        (item.scores.quirk +
          item.scores.coherence +
          item.scores.atmosphere +
          item.scores.sensory_focus +
          item.scores.narrative_pace +
          item.scores.contemporary_relevance) /
        6

      const color = colorScale(item.scores)

      // Determine shape based on 'sensory_focus' score
      const shapeScore = item.scores.sensory_focus
      let shape = 'sphere'
      if (shapeScore >= 8) {
        shape = 'torus'
      } else if (shapeScore >= 6) {
        shape = 'icosahedron'
      } else if (shapeScore >= 4) {
        shape = 'dodecahedron'
      } else if (shapeScore >= 2) {
        shape = 'octahedron'
      } else {
        shape = 'tetrahedron'
      }

      return {
        position: new THREE.Vector3(item.umap_1, item.umap_2, item.umap_3),
        color: color,
        size: averageScore / 5,
        shape: shape,
        data: item,
      }
    })
  }, [colorScale])

  const handlePointerOver = useCallback(
    (pointData: DataPoint, pointPosition: THREE.Vector3) => {
      setHoveredPoint(pointData)

      // Find the three closest points
      const distances = points.map((p) => ({
        point: p,
        distance: pointPosition.distanceTo(p.position),
      }))

      // Sort by distance and exclude the hovered point itself
      const closestPoints = distances
        .filter((d) => d.point.data.id !== pointData.id)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)

      // Create lines connecting to the three closest points
      const newLines = closestPoints.map((d, index) => (
        <group key={`line-${index}`}>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([
                  pointPosition.x,
                  pointPosition.y,
                  pointPosition.z,
                  d.point.position.x,
                  d.point.position.y,
                  d.point.position.z,
                ])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="white" />
          </line>
          <Html
            position={[
              (pointPosition.x + d.point.position.x) / 2,
              (pointPosition.y + d.point.position.y) / 2,
              (pointPosition.z + d.point.position.z) / 2,
            ]}
            style={{
              color: 'white',
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '2px 4px',
              borderRadius: '4px',
              fontSize: '12px',
            }}
          >
            {`ΔScore: ${(
              Math.abs(
                pointData.scores.quirk +
                  pointData.scores.coherence +
                  pointData.scores.atmosphere -
                  (d.point.data.scores.quirk +
                    d.point.data.scores.coherence +
                    d.point.data.scores.atmosphere)
              ) / 3
            ).toFixed(2)}`}
          </Html>
        </group>
      ))

      setLines(newLines)
    },
    [points]
  )

  const handlePointerOut = useCallback(() => {
    setHoveredPoint(null)
    setLines([])
  }, [])

  const handleClick = useCallback(
    (point: DataPoint) => {
      setSelectedPoint((prevPoint) => (prevPoint === point ? null : point))

      if (controlsRef.current) {
        if (point === selectedPoint) {
          controlsRef.current.reset(true)
        } else {
          const targetPosition = new THREE.Vector3(
            point.umap_1,
            point.umap_2,
            point.umap_3
          )
          controlsRef.current.setLookAt(
            targetPosition.x + 2,
            targetPosition.y + 2,
            targetPosition.z + 2,
            targetPosition.x,
            targetPosition.y,
            targetPosition.z,
            true
          )
        }
      }
    },
    [selectedPoint, setSelectedPoint]
  )

  return (
    <>
      <CameraControls ref={controlsRef} />
      {points.map((point, i) => (
        <mesh
          key={i}
          position={point.position}
          onPointerOver={() => handlePointerOver(point.data, point.position)}
          onPointerOut={handlePointerOut}
          onClick={() => handleClick(point.data)}
        >
          {/* Render different geometries based on the shape */}
          {point.shape === 'sphere' && (
            <sphereGeometry args={[point.size * 0.1, 32, 32]} />
          )}
          {point.shape === 'torus' && (
            <torusGeometry
              args={[point.size * 0.1, point.size * 0.04, 16, 100]}
            />
          )}
          {point.shape === 'icosahedron' && (
            <icosahedronGeometry args={[point.size * 0.1, 0]} />
          )}
          {point.shape === 'dodecahedron' && (
            <dodecahedronGeometry args={[point.size * 0.1, 0]} />
          )}
          {point.shape === 'octahedron' && (
            <octahedronGeometry args={[point.size * 0.1, 0]} />
          )}
          {point.shape === 'tetrahedron' && (
            <tetrahedronGeometry args={[point.size * 0.1, 0]} />
          )}
          <meshStandardMaterial
            color={
              point.data === selectedPoint
                ? 'red'
                : point.data === hoveredPoint
                ? 'yellow'
                : point.color
            }
          />
        </mesh>
      ))}
      {/* Render lines and score differences */}
      {lines}
      {/* Removed OverlayInfo from here */}
    </>
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
    <div className="w-full h-screen bg-black relative">
      <Canvas camera={{ position: cameraPosition, fov: 60 }}>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DataPoints selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} />
      </Canvas>
      {/* Render the OverlayInfo component outside of the Canvas */}
      <OverlayInfo point={selectedPoint} onClose={() => setSelectedPoint(null)} />
    </div>
  )
}