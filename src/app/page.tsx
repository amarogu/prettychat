import Image from 'next/image'
import {Sidebar} from './Sidebar'
import { GlobalStateProvider } from './GlobalStateContext'

export default function Home() {
  return (
    <GlobalStateProvider>
      <main className="min-h-screen p-4">
        <Sidebar />
      </main>
    </GlobalStateProvider>
  )
}
