import { Button } from '@/components/ui/button'
import React from 'react'

function Produtos(){
 
  return(
    <>
      <header className='w-full h-20 px-10 bg-gray-800 flex items-center justify-between pr-32 text-red-500 text-2xl font-bold'>
        <span>Mercado CD</span>
        <ul className='flex items-center justify-center gap-5 '>
          <a href="/" className='text-white text-lg hover:underline transition-all'>Início</a>
          <a href="/user/admin" className='text-white text-lg hover:underline transition-all'>Area Admin</a>
        </ul>
      </header>
    <main className='w-screen h-[80vh] px-10'>
    </main>
      <div className='w-full h-[200px] bg-gray-800 p-10'>

      </div>
    </>
  )
}
export default Produtos