import { Card } from "@/components/ui/card"
import DynamicPath from "@/components/DynamicPath"
import SlimVideoPlayer from "@/components/SlimVideoPlayer"
export default function AgentView() {
  return (
    <div className="w-full h-full grid grid-rows-[2fr_1fr] gap-4">
      <Card className="w-full h-full flex items-center justify-center">
        <DynamicPath />
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <Card className="w-full h-full flex items-center justify-center">
          <SlimVideoPlayer />
        </Card>
        <Card className="w-full h-full flex items-center justify-center">
          <p>Subdivided Box 2 Placeholder</p>
        </Card>
      </div>
    </div>
  )
}