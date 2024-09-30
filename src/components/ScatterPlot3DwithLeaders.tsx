"use client"

import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line, Plane } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion-3d'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

// Mock data for the scatterplot
const mockData = Array.from({ length: 500 }, () => ({
  x: Math.random() * 10 - 5,
  y: Math.random() * 10 - 5,
  z: Math.random() * 10 - 5,
  value: Math.random(),
}))

function Scatterplot({ data, sliceAxis, slicePosition }) {
  return (
    <group>
      {data.map((point, index) => {
        const isVisible = (sliceAxis === 'x' && point.x > slicePosition) ||
                          (sliceAxis === 'y' && point.y > slicePosition) ||
                          (sliceAxis === 'z' && point.z > slicePosition)
        if (!isVisible) return null
        return (
          <motion.group key={index} position={[point.x, point.y, point.z]}>
            <Line
              points={[
                [0, 0, 0],
                [0, -point.y, 0],
                [0, -point.y, -point.z],
                [point.x, -point.y, -point.z],
              ]}
              color={`hsl(${point.value * 360}, 100%, 50%)`}
              lineWidth={1}
            />
            <mesh scale={0.05}>
              <sphereGeometry args={[1, 8, 8]} />
              <meshBasicMaterial color={`hsl(${point.value * 360}, 100%, 50%)`} wireframe />
            </mesh>
          </motion.group>
        )
      })}
    </group>
  )
}

function SlicePlane({ axis, position }) {
  const planeConfig = {
    x: { rotation: [0, Math.PI / 2, 0], position: [position, 0, 0] },
    y: { rotation: [Math.PI / 2, 0, 0], position: [0, position, 0] },
    z: { rotation: [0, 0, 0], position: [0, 0, position] },
  }

  return (
    <Plane
      args={[10, 10]}
      {...planeConfig[axis]}
    >
      <meshBasicMaterial color="#00FFFF" opacity={0.2} transparent side={THREE.DoubleSide} />
    </Plane>
  )
}

export default function Component() {
  const [sliceAxis, setSliceAxis] = useState('x')
  const [slicePosition, setSlicePosition] = useState(-5)

  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={0.5} />
        <Scatterplot data={mockData} sliceAxis={sliceAxis} slicePosition={slicePosition} />
        <SlicePlane axis={sliceAxis} position={slicePosition} />
        <gridHelper args={[10, 10, '#404040', '#404040']} />
        <OrbitControls />
        <axesHelper args={[5]} />
        <Text position={[5.5, 0, 0]} fontSize={0.5} color="red">
          X
        </Text>
        <Text position={[0, 5.5, 0]} fontSize={0.5} color="green">
          Y
        </Text>
        <Text position={[0, 0, 5.5]} fontSize={0.5} color="blue">
          Z
        </Text>
      </Canvas>
      <div className="fixed bottom-4 left-4 flex flex-col space-y-2">
        <div className="flex space-x-2">
          {['x', 'y', 'z'].map((axis) => (
            <Button
              key={axis}
              className={`bg-[#00FFFF] text-black hover:bg-[#00CCCC] ${sliceAxis === axis ? 'ring-2 ring-white' : ''}`}
              onClick={() => setSliceAxis(axis)}
            >
              {axis.toUpperCase()}
            </Button>
          ))}
        </div>
        <Slider
          min={-5}
          max={5}
          step={0.1}
          value={[slicePosition]}
          onValueChange={([value]) => setSlicePosition(value)}
          className="w-64"
        />
      </div>
    </div>
  )
}