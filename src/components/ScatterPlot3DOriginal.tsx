"use client"

import React, { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { CameraControls, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion-3d'
import processedMapResults from '../data/processed_map_results.json'

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

// Use the imported JSON data
const data: DataPoint[] = processedMapResults

function FuturisticBox({ content, position }: { content: string; position: THREE.Vector3 }) {
  const { size } = useThree()
  const boxRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.y += 0.005
    }
  })

  return (
    <motion.group
      position={[position.x + 3, position.y, position.z]}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <mesh ref={boxRef}>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshPhongMaterial color="#ff6600" transparent opacity={0.2} />
      </mesh>
      <Html
        transform
        occlude
        style={{
          width: '300px',
          height: '200px',
          padding: '20px',
          background: 'rgba(255, 102, 0, 0.1)',
          borderRadius: '10px',
          overflow: 'auto',
        }}
      >
        <div className="text-white text-sm">{content}</div>
      </Html>
    </motion.group>
  )
}

function DataPoints() {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null)
  const controlsRef = useRef<CameraControls>(null)

  const points = useMemo(() => {
    return data.map((item) => ({
      position: new THREE.Vector3(item.umap_1, item.umap_2, item.umap_3),
      color: new THREE.Color(
        item.scores.quirk / 10,
        item.scores.coherence / 10,
        item.scores.contemporary_relevance / 10
      ),
      size: (item.scores.atmosphere + item.scores.sensory_focus) / 20,
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
  }, [selectedPoint])

  return (
    <>
      <CameraControls ref={controlsRef} />
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.map((p) => [p.position.x, p.position.y, p.position.z]).flat())}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={points.length}
            array={new Float32Array(points.map((p) => [p.color.r, p.color.g, p.color.b]).flat())}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      {points.map((point, i) => (
        <mesh
          key={i}
          position={point.position}
          onPointerOver={() => handlePointerOver(point.data)}
          onPointerOut={handlePointerOut}
          onClick={() => handleClick(point.data)}
        >
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial 
            color={
              point.data === selectedPoint 
                ? "red" 
                : point.data === hoveredPoint 
                  ? "yellow" 
                  : point.color
            } 
          />
        </mesh>
      ))}
      {selectedPoint && (
        <FuturisticBox 
          content={selectedPoint.content} 
          position={new THREE.Vector3(selectedPoint.umap_1, selectedPoint.umap_2, selectedPoint.umap_3)}
        />
      )}
    </>
  )
}

export default function ScatterPlot3D() {
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
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: cameraPosition, fov: 60 }}>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DataPoints />
      </Canvas>
    </div>
  )
}