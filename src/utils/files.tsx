import {
  BaseDirectory,
  createDir,
  exists,
  readTextFile,
  writeFile
} from '@tauri-apps/api/fs'
import { basePrices } from './prices'

const createDataFolder = async (): Promise<void> => {
  await createDir('data', {
    dir: BaseDirectory.Desktop,
    recursive: true
  })
}

const createDataFile = async (fileName: string): Promise<void> => {
  await writeFile(
    {
      contents: JSON.stringify(basePrices),
      path: fileName
    },
    {
      dir: BaseDirectory.Desktop
    }
  )
}

export const createBaseFolder = async (): Promise<object> => {
  const dataFileName = 'data/prices.json'
  const baseFileExists = await exists(dataFileName, {
    dir: BaseDirectory.Desktop
  })

  if (!baseFileExists) {
    try {
      await createDataFolder()
      await createDataFile(dataFileName)
    } catch (e: any) {
      console.error(e)
    }
  }

  try {
    const jsonText = await readTextFile(dataFileName, {
      dir: BaseDirectory.Desktop
    })
    return JSON.parse(jsonText)
  } catch (e: any) {
    console.error(e)
    return {}
  }
}
