// utils/loadData.ts
import fs from 'fs'
import path from 'path'
import { DataPoint } from '../types/types'

export function loadData(): DataPoint[] {
  const filePath = path.join(process.cwd(), 'data', 'processed_map.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents) as DataPoint[]
}