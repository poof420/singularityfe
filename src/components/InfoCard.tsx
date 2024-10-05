import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataPoint } from './MapView'
import { useMemo } from 'react'
import { AgentDataPoint } from '@/types/types' // Adjust the import path as necessary

interface InfoCardProps {
  position: string
  activeTab: string
  selectedPoint?: DataPoint | null
  allPoints: DataPoint[]
  onPointFocus: (point: DataPoint) => void
  agentData: AgentDataPoint[]
  // Removed agentTimestep
}

export default function InfoCard({
  position,
  activeTab,
  selectedPoint,
  allPoints,
  onPointFocus,
  agentData,
}: InfoCardProps) {
  const latestPoints = useMemo(() => {
    return allPoints
      .sort((a, b) => b.timestep - a.timestep)
      .slice(0, 5)
  }, [allPoints])

  // Get the latest agent data point
  const latestAgentData = useMemo(() => {
    return agentData[agentData.length - 1]
  }, [agentData])

  const renderContent = () => {
    if (activeTab === 'AGENT' && position === 'left') {
      return (
        <>
          <h3 className="font-bold mb-2">Latest Agent Goals:</h3>
          <p>{latestAgentData?.goals || 'No goals available.'}</p>
        </>
      )
    } else if (activeTab === 'MAP' && position === 'left') {
      return (
        <>
          <h3 className="font-bold mb-2">Latest Points:</h3>
          <ul>
            {latestPoints.map((point) => (
              <li key={point.id} className="mb-2">
                <button
                  onClick={() => onPointFocus(point)}
                  className="text-blue-500 hover:underline"
                >
                  {point.content.substring(0, 30)}...
                </button>
              </li>
            ))}
          </ul>
        </>
      )
    } else if (activeTab === 'MAP' && position === 'right' && selectedPoint) {
      return (
        <>
          <p>
            <i>{selectedPoint.content}</i>
          </p>
          <p>
            <strong>by:</strong> {selectedPoint.user_id}
          </p>
          <h3 className="mt-4 font-bold">Scores:</h3>
          <ul>
            {Object.entries(selectedPoint.scores).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </>
      )
    } else {
      return <p>Placeholder for {activeTab} information</p>
    }
  }

  return (
    <Card className="w-full h-[60vh] overflow-auto">
      <CardHeader>
        <CardTitle>
          {position.charAt(0).toUpperCase() + position.slice(1)} Info - {activeTab}
        </CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}