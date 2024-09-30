"use client"

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { Text } from '@react-three/drei'

interface Point {
  x: number
  y: number
  label?: string
  size?: number
  color?: string
}

interface ConnectedLineChartProps {
  points: Point[]
  width?: number
  height?: number
  backgroundColor?: string
  lineColor?: string
}

const AnimatedLine: React.FC<{ points: Point[], lineColor: string }> = ({ points, lineColor }) => {
  const ref = useRef<THREE.Line>(null)
  const { size } = useThree()

  useFrame(() => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as number[]
      for (let i = 0; i < points.length; i++) {
        positions[i * 3] = (points[i].x / size.width) * 2 - 1
        positions[i * 3 + 1] = -(points[i].y / size.height) * 2 + 1
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={points.length}
          array={new Float32Array(points.length * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={lineColor} linewidth={2} />
    </line>
  )
}

const Point: React.FC<Point & { index: number }> = ({ x, y, label, size = 0.05, color = 'white', index }) => {
  const { size: canvasSize } = useThree()
  const position: [number, number, number] = [
    (x / canvasSize.width) * 2 - 1,
    -(y / canvasSize.height) * 2 + 1,
    0
  ]

  return (
    <motion.group
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <mesh position={position}>
        <circleGeometry args={[size, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {label && (
        <Text
          position={[position[0], position[1] + 0.1, position[2]]}
          fontSize={0.1}
          color={color}
        >
          {label}
        </Text>
      )}
    </motion.group>
  )
}

export const ConnectedLineChart: React.FC<ConnectedLineChartProps> = ({
  points,
  width = 800,
  height = 600,
  backgroundColor = '#000000',
  lineColor = '#ffffff'
}) => {
  const [currentPoints, setCurrentPoints] = useState<Point[]>([])

  useEffect(() => {
    const addPoints = async () => {
      for (let i = 0; i < points.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setCurrentPoints(prev => [...prev, points[i]])
      }
    }
    addPoints()
  }, [points])

  return (
    <div style={{ width, height, backgroundColor }}>
      <Canvas>
        <AnimatedLine points={currentPoints} lineColor={lineColor} />
        {currentPoints.map((point, index) => (
          <Point key={index} {...point} index={index} />
        ))}
      </Canvas>
    </div>
  )
}

export default function Component() {
  const samplePoints: Point[] = [
    { x: 100, y: 100, label: '9.8706' },
    { x: 300, y: 500, label: '12.3454' },
    { x: 500, y: 300, label: '11.5678' },
    { x: 700, y: 200, label: 'Phrase' },
  ]

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <ConnectedLineChart
        points={samplePoints}
        width={800}
        height={600}
        backgroundColor="#000000"
        lineColor="#ff00ff"
      />
    </div>
  )
}