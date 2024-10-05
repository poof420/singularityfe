'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import NewsTicker from '@/components/NewsTicker'
import MapView from '@/components/MapView'
import UserView from '@/components/UserView'
import InfoCard from '@/components/InfoCard'
import DynamicPath from '@/components/DynamicPath'
import { DataPoint } from '@/components/MapView'
import processedMapResults from '@/data/processed_map_results.json'
import agentDataJson from '@/data/agent_data.json'
import { AgentDataPoint } from '@/types/types' // Ensure correct import path



const MintButton = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.div
      className="border p-4 text-white text-center font-bold text-lg relative overflow-hidden"
      animate={{
        backgroundColor: ['#aaaaaa', '#777777', '#333333', '#000000'],
        transition: { duration: 20, repeat: Infinity }
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          transition: { duration: 2, repeat: Infinity }
        }}
      >
 
          MINT

      </motion.div>
      <motion.div
        className="absolute inset-0 mix-blend-multiply"
        animate={{
          opacity: [0, 0.5, 0],
          transition: { duration: 5, repeat: Infinity }
        }}
      />
    </motion.div>
  );
};

export default function Dashboard() {
  // Removed agentTimestep state
  // const [agentTimestep, setAgentTimestep] = useState(0)

  // Existing state and functions
  const [activeTab, setActiveTab] = useState('MAP')
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null)
  const [allPoints, setAllPoints] = useState<DataPoint[]>([])
  const [agentData, setAgentData] = useState<AgentDataPoint[]>([])

  // Import data on component mount
  useEffect(() => {
    setAllPoints(processedMapResults)

    // Process agentDataJson as necessary
    const processedAgentData = agentDataJson.map((dataPoint) => {
      const { position } = dataPoint
      const [x = 0, y = 0, z = 0] = position
      const positionTuple: [number, number, number] = [x, y, z]
      return {
        ...dataPoint,
        position: positionTuple,
      }
    }) as AgentDataPoint[]
    setAgentData(processedAgentData)
  }, [])

  // Function to focus on a point (passed to MapView and InfoCard)
  const focusOnPoint = useCallback((point: DataPoint) => {
    setSelectedPoint(point)
    // Additional logic if needed
  }, [])

  // Center Content
  const centerContent = {
    MAP: (
      <Card className="w-full h-[60vh]">
        <MapView
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          focusOnPoint={focusOnPoint}
        />
      </Card>
    ),
    AGENT: (
      <Card className="w-full h-[60vh]">
        <DynamicPath />
      </Card>
    ),
    USER: (
      <Card className="w-full h-[60vh]">
        <UserView />
      </Card>
    ),
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-atkinson p-4">
      <Tabs
        defaultValue="MAP"
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="MAP">MAP</TabsTrigger>
          <TabsTrigger value="AGENT">AGENT</TabsTrigger>
          <TabsTrigger value="USER">USER</TabsTrigger>
        </TabsList>
        <div className="mt-4 grid grid-cols-[1fr_2fr_1fr] gap-4">
          {/* Left InfoCard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${activeTab}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <InfoCard
                position="left"
                activeTab={activeTab}
                selectedPoint={selectedPoint}
                allPoints={allPoints}
                onPointFocus={focusOnPoint}
                agentData={agentData}
                // Removed agentTimestep
              />
            </motion.div>
          </AnimatePresence>

          {/* Center Content */}
          {centerContent[activeTab as keyof typeof centerContent]}

          {/* Right InfoCard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${activeTab}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <InfoCard
                position="right"
                activeTab={activeTab}
                selectedPoint={selectedPoint}
                allPoints={allPoints}
                onPointFocus={focusOnPoint}
                agentData={agentData}
                // Removed agentTimestep
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>
      <div className="mt-4 mb-4 grid grid-cols-3 gap-4">
        <div className="p-4 border text-white text-center">
          CURRENT STAR COUNT: 233
        </div>
        <MintButton />
        <div className="p-4 border text-white text-center">
          AGENT PROGRESS: 183/999
        </div>
      </div>
      
      <div className="mt-4">
        <NewsTicker />
      </div>
    </div>
  )
}