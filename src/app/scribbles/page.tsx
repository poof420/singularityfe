import data from '@/data/processed_map_results.json'; // Adjust the path as needed
import ScribblePlot from '@/components/ScribblePlot';
import type DataPoint from '@/components/ScribblePlot';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-[400px]">
        <div className="p-4">
          <ScribblePlot data={data as DataPoint[]} />
        </div>
      </div>
    </main>
  );
}
