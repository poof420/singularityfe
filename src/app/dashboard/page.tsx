import ScatterPlot3D from '@/components/ScatterPlot3D'



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="text-4xl font-bold">THIS IS THE DASHBOARD</div>
      <div className="w-full h-[400px]">
      <ScatterPlot3D />
      </div>
    </main>
  )
}