import { useState, useEffect } from 'react'
import './App.css'

import { createBaseFolder } from './utils/files'

function App () {
  const [prices, setPrices] = useState({})

  useEffect(() => {
    async function getData () {
      const fileData = await createBaseFolder()
      setPrices(fileData)
    }

    getData().catch(e => console.error(e))
  })

  return (
    <div className='container'>
      <h1>Welcome to Tauri!</h1>
    </div>
  )
}

export default App
