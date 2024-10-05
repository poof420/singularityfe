// types/types.ts

export type DataPoint = {
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

export interface AgentDataPoint {
  run_id: string
  timestep: number
  position: [number, number, number]
  chaos: number
  goals: string
  past_positions: [number, number, number][]
  short_term_memory: string[]
}