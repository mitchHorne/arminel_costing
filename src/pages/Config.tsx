import { BaseDirectory, removeFile } from '@tauri-apps/api/fs'

export const Config = (): JSX.Element => {
  return (
    <div>
      <h1>This is the Config page</h1>
      <button
        onClick={() =>
          removeFile('data/prices.json', { dir: BaseDirectory.AppData })
        }
      >
        Scrap config
      </button>
    </div>
  )
}
