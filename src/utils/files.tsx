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
    dir: BaseDirectory.AppData,
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
      dir: BaseDirectory.AppData
    }
  )
}

interface CreateBaseFolderReturn {
  data: object
  configured: boolean
}

export const createBaseFolder = async (): Promise<CreateBaseFolderReturn> => {
  const dataFileName = 'data/prices.json'
  const baseFileExists = await exists(dataFileName, {
    dir: BaseDirectory.AppData
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
      dir: BaseDirectory.AppData
    })
    return { data: JSON.parse(jsonText), configured: baseFileExists }
  } catch (e: any) {
    console.error(e)
    return { data: {}, configured: false }
  }
}
