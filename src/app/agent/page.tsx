import DynamicPath from '@/components/DynamicPath'
import FuturisticCard from '@/components/ui/futuristic-card'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-[400px]">
      <DynamicPath />
      <div className="p-4">
      <FuturisticCard />
    </div>
      </div>
    </main>
  )
}