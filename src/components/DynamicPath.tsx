"use client"

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Text, Line, CameraControls } from '@react-three/drei'
import * as THREE from 'three'
import agentDataJson from '@/data/agent_data.json'
import processedMapResultsJson from '@/data/processed_map_results.json'
import { AgentDataPoint } from '@/types/types'
import type { CameraControls as CameraControlsImpl } from '@react-three/drei'

interface DataPoint {
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

interface Point {
  id: string
  x: number
  y: number
  z: number
  size: number
  filled: boolean
  label: string
  data?: DataPoint // Add data property
}

interface Connection {
  from: string
  to: string
  color: string
  thickness: number
}

export default function DynamicPath() {
  const [agentTimestep, setAgentTimestep] = useState(0) // Internal state
  const controlsRef = useRef<CameraControlsImpl>(null)

  // Process agent data
  const agentData = useMemo(() => {
    return (agentDataJson as AgentDataPoint[]).map((dataPoint) => {
      const { position } = dataPoint
      const [x = 0, y = 0, z = 0] = position
      const positionTuple: [number, number, number] = [x, y, z]
      return {
        ...dataPoint,
        position: positionTuple,
      }
    })
  }, [])

  const mapData = processedMapResultsJson as DataPoint[]

  const agentPositions = useMemo<Point[]>(() => {
    return agentData.map((dataPoint) => ({
      id: dataPoint.timestep.toString(),
      x: dataPoint.position[0],
      y: dataPoint.position[1],
      z: dataPoint.position[2],
      size: 0.2,
      filled: true,
      label: dataPoint.timestep.toString(),
    }))
  }, [])

  // Current Agent Position
  const currentAgentPosition = useMemo<Point | null>(() => {
    const dataPoint = agentPositions.find(
      (point) => point.id === agentTimestep.toString()
    )
    return dataPoint || null
  }, [agentPositions, agentTimestep])

  // Closest Points from Map Data
  const closestPoints: Point[] = useMemo(() => {
    if (!currentAgentPosition) return []
    // Calculate distances to all map points
    const distances = mapData.map((dataPoint) => {
      const dx = dataPoint.umap_1 - currentAgentPosition.x
      const dy = dataPoint.umap_2 - currentAgentPosition.y
      const dz = dataPoint.umap_3 - currentAgentPosition.z
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
      return {
        dataPoint,
        distance,
      }
    })
    // Sort by distance
    const sorted = distances.sort((a, b) => a.distance - b.distance)
    // Take the four closest points
    return sorted.slice(0, 4).map(({ dataPoint }) => ({
      id: dataPoint.id.toString(),
      x: dataPoint.umap_1,
      y: dataPoint.umap_2,
      z: dataPoint.umap_3,
      size: 0.15,
      filled: true,
      label: dataPoint.id.toString(),
      data: dataPoint, // Include dataPoint here
    }))
  }, [currentAgentPosition])

  // Connections from agent to closest points
  const connectionsToClosestPoints: Connection[] = useMemo(() => {
    if (!currentAgentPosition) return []

    return closestPoints.map((point) => {
      // Ensure point.data is defined
      const pointScores = point.data?.scores ?? {}

      // Explicitly type pointScores
      const typedPointScores: { [key: string]: number } = pointScores

      // Cast Object.values to number[]
      const scoreValues = Object.values(typedPointScores) as number[]

      // Sum up the scores
      const totalScore = scoreValues.reduce((acc, val) => acc + val, 0)

      // Map totalScore to color and thickness (using arbitrary ranges)
      const color = `hsl(${(1 - totalScore / 60) * 120}, 100%, 50%)` // Adjust based on score range
      const thickness = 0.02 + (totalScore / 60) * 0.08

      return {
        from: currentAgentPosition.id,
        to: point.id,
        color,
        thickness,
      }
    })
  }, [currentAgentPosition, closestPoints])

  // Function to focus camera on the current agent position
  const focusCameraOnAgent = useCallback(() => {
    if (controlsRef.current && currentAgentPosition) {
      const targetPosition = new THREE.Vector3(
        currentAgentPosition.x,
        currentAgentPosition.y,
        currentAgentPosition.z
      )
      controlsRef.current.setLookAt(
        targetPosition.x + 5,
        targetPosition.y + 5,
        targetPosition.z + 5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      )
    }
  }, [currentAgentPosition])

  // Focus camera whenever the agent's position changes
  useEffect(() => {
    focusCameraOnAgent()
  }, [focusCameraOnAgent])

  // Handlers for timestep navigation
  const handleNextStep = () => {
    setAgentTimestep((prev) => Math.min(prev + 1, agentData.length - 1))
  }
  const handlePrevStep = () => {
    setAgentTimestep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="w-full h-full bg-black relative">
      <Canvas>
        <ambientLight intensity={0.5} />
        <CameraControls ref={controlsRef} />

        {/* Render agent positions up to current timestep */}
        {agentPositions
          .filter((point) => parseInt(point.id) <= agentTimestep)
          .map((point) => (
            <PointComponent key={point.id} point={point} color="white" />
          ))}

        {/* Render connections between agent positions */}
        {agentPositions
          .filter((point) => parseInt(point.id) < agentTimestep)
          .map((point, index) => {
            const nextPoint = agentPositions[index + 1]
            if (!nextPoint || parseInt(nextPoint.id) > agentTimestep) return null
            return (
              <Line
                key={`agent-line-${index}`}
                points={[
                  [point.x, point.y, point.z],
                  [nextPoint.x, nextPoint.y, nextPoint.z],
                ]}
                color="white"
                lineWidth={2}
              />
            )
          })}

        {/* Render closest points */}
        {closestPoints.map((point) => (
          <PointComponent key={point.id} point={point} color="orange" />
        ))}

        {/* Render connections from agent to closest points */}
        {connectionsToClosestPoints.map((connection, index) => (
          <ConnectionComponent
            key={`connection-${index}`}
            connection={connection}
            points={[currentAgentPosition!, ...closestPoints]}
          />
        ))}
      </Canvas>

      {/* Timestep Navigation Controls */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          className="bg-white text-black px-2 py-1 text-sm rounded"
          onClick={handlePrevStep}
          disabled={agentTimestep === 0}
        >
          &lt;
        </button>
        <span className="text-white">Timestep: {agentTimestep}</span>
        <button
          className="bg-white text-black px-2 py-1 text-sm rounded"
          onClick={handleNextStep}
          disabled={agentTimestep === agentData.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

function PointComponent({
  point,
  color,
}: {
  point: Point
  color: string
}) {
  return (
    <group position={[point.x, point.y, point.z]}>
      <mesh>
        <sphereGeometry args={[point.size, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={point.filled ? 1 : 0.5}
        />
      </mesh>
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.15}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {point.label}
      </Text>
    </group>
  )
}

function ConnectionComponent({
  connection,
  points,
}: {
  connection: Connection
  points: Point[]
}) {
  const from = points.find((p) => p.id === connection.from)
  const to = points.find((p) => p.id === connection.to)

  if (!from || !to) return null

  return (
    <Line
      points={[
        [from.x, from.y, from.z],
        [to.x, to.y, to.z],
      ]}
      color={connection.color}
      lineWidth={connection.thickness * 100} // Adjust scaling if needed
    />
  )
}