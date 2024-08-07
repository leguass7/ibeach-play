import path from 'node:path'
import fs from 'node:fs/promises'

export async function loadFile(fileName: string) {
  const filePath = path.resolve(__dirname, 'provision', fileName)
  const buffer = await fs.readFile(filePath)
  const jsonData = buffer.toString()
  const [, , data] = JSON.parse(jsonData)
  return data?.data
}
