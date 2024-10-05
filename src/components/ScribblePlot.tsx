'use client';

// components/ScribblePlot.tsx
import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';

interface Scores {
  quirk: number;
  coherence: number;
  atmosphere: number;
  sensory_focus: number;
  narrative_pace: number;
  contemporary_relevance: number;
}

export interface DataPoint {
  timestep: number;
  content: string;
  umap_1: number;
  umap_2: number;
  umap_3: number;
  reasoning: string;
  scores: Scores;
}

const ScribbleLine: React.FC<{ dataPoint: DataPoint }> = ({ dataPoint }) => {
  // Generate a scribble path based on the single data point
  const points = useMemo(() => {
    const numPoints = 100; // Number of points in the scribble
    const radius = 5;      // Radius of the scribble
    const pointsArray = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = i * 0.1;
      const x =
        dataPoint.umap_1 + radius * Math.cos(angle) * Math.random() * 0.5;
      const y =
        dataPoint.umap_2 + radius * Math.sin(angle) * Math.random() * 0.5;
      const z = dataPoint.umap_3 + Math.random() - 0.5;

      pointsArray.push([x, y, z]);
    }

    return pointsArray;
  }, [dataPoint]);

  return (
    <Line
      points={points}
      color="red"
      lineWidth={2}
      curveType="catmullrom"
      tension={0.5}
    />
  );
};

const ScribblePlot: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  // Select a single data point, e.g., the first one
  const dataPoint = data[0];

  return (
    <Canvas
      camera={{ position: [0, 0, 50], fov: 75 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[50, 50, 50]} />
      <OrbitControls />
      <ScribbleLine dataPoint={dataPoint} />
    </Canvas>
  );
};

export default ScribblePlot;