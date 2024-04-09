import {
  BaseDirectory,
  createDir,
  exists,
  readTextFile,
  writeFile
} from '@tauri-apps/api/fs'
import { Prices, initialPrices } from '../constants/prices'

const dataFileName = 'data/prices.json'

const createDataFolder = async (): Promise<void> => {
  await createDir('data', {
    dir: BaseDirectory.AppData,
    recursive: true
  })
}

interface CreateBaseFolderReturn {
  data: Prices
  configured: boolean
}

export const createBaseFolder = async (): Promise<CreateBaseFolderReturn> => {
  const baseFileExists = await exists(dataFileName, {
    dir: BaseDirectory.AppData
  })

  if (!baseFileExists) {
    try {
      await createDataFolder()
      await saveData(initialPrices)
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
    return { data: initialPrices, configured: false }
  }
}

export const saveData = async (prices: Prices): Promise<void> => {
  await writeFile(
    {
      contents: JSON.stringify(prices),
      path: dataFileName
    },
    {
      dir: BaseDirectory.AppData
    }
  )
}
