'use client'
import Image from 'next/image'
import {Sidebar} from './Sidebar'
import { GlobalStateProvider } from './GlobalStateContext'
import CloseIcon from '@mui/icons-material/Close';

export default function Home() {
  return (
    <GlobalStateProvider>
      <main className="min-h-screen p-4">
        <Sidebar />
        <button>
          <CloseIcon className='text-sm absolute right-0 top-0 m-4' />
        </button>
      </main>
    </GlobalStateProvider>
  )
}
