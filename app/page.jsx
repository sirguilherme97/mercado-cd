'use client'
import React, { useEffect, useState } from 'react';
import { getAllProducts, getAllProductsPromo} from './_utils/graphApi';
import { Barcode, Building2} from 'lucide-react';
import {Nav} from '../components/Nav'
export default function Home() {
  
  const [product, setProduct] = useState([])
  const [productPromo, setProductPromo] = useState([])

  useEffect(() => {

    getAllProductsPromo().then(resp =>{
      setProductPromo(resp?.produtos)
    }).catch(error => {
      console.error("Error getting product list:", error);
    })
    getAllProducts().then(resp => {
      console.log(resp)
      setProduct(resp?.produtos)
    }).catch(error => {
      console.error("Error getting product list:", error);
    })
    
  }, []);

  return (
    <>
      <Nav/>
    <main className='w-screen h-auto px-10'>
      <div className='w-full h-[400px] bg-red-500 mt-10'></div>
      <div className='flex flex-col p-10 gap-5  items-start justify-start h-full font-medium'>
         <div className='flex-col '>
            <h2 className="font-bold text-2xl">Promoção</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-5 w-full'>
            {productPromo?.map((item,index)=>{
              return(
                <div key={index} className='grid col-span-1  mt-10 relative h-[370px]'>
                  <img src={item.url} alt="imagem do produto" className='rounded w-[500px] max-h-72 min-h-72 bg-cover max-w-[250px] min-w-[250px]'/>
                  <div className='  w-full h-full flex flex-col items-starts justify-center '>
                    <div className='  flex h-full w-full  gap-2 items-center justify-start'>
                      <div className='flex p-2 h-full w-full gap-2 items-center justify-start'>
                        <Barcode size={14} className=' text-gray-400'/>
                        <h1 className='font-bold text-black/80'>{item.nome}</h1>
                      </div>
                    </div>
                    <div className=' flex p-2 h-full w-full gap-2 items-center justify-start'>
                      <Building2  size={14} className=' text-gray-400'/>
                      <h1 className='font-bold text-black/80'>{item.nomeEmpresa}</h1>
                    </div>
                    <div className='flex px-2 h-full w-full  gap-2 items-center justify-start'>
                      <h1 className='font-medium text-sm text-black/80'>{item.descricao}</h1>
                    </div>
                  </div>
                  <div className='z-10 absolute -top-10 -right-16  rounded-2xl bg-red-500 w-32 h-20 flex flex-col items-center p-5 justify-center '>
                    <span className='text-4xl font-bold text-yellow-500 brightness-125 '>{(item.preco * 0.8).toFixed(2)}</span>
                    {item.unOuKg ? <span className='text-base text-yellow-500 brightness-150  font-bold'>Unidade</span>:<span className='text-base text-yellow-500 brightness-150 font-bold'>Kilo</span> }
                  </div>
                </div>
              )
            })}
            </div>
         </div>
         <div className='flex-col'>
         <h2 className="font-bold text-2xl mt-20">Todos os Produtos</h2>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mt-5 w-full'>
            {product?.map((item,index)=>{
              return(
                <div key={index} className='grid col-span-1  mt-10 relative h-[370px]'>
                  <img src={item.url} alt="imagem do produto" className='rounded w-[500px] max-h-72 min-h-72 bg-cover max-w-[250px] min-w-[250px]'/>
                  <div className='  w-full h-full flex flex-col items-starts justify-center '>
                    <div className='  flex h-full w-full  gap-2 items-center justify-start'>
                      <div className='flex p-2 h-full w-full gap-2 items-center justify-start'>
                        <Barcode size={14} className=' text-gray-400'/>
                        <h1 className='font-bold text-black/80'>{item.nome}</h1>
                      </div>
                    </div>
                    <div className=' flex p-2 h-full w-full gap-2 items-center justify-start'>
                      <Building2  size={14} className=' text-gray-400'/>
                      <h1 className='font-bold text-black/80'>{item.nomeEmpresa}</h1>
                    </div>
                    <div className='flex px-2 h-full w-full  gap-2 items-center justify-start'>
                      <h1 className='font-medium text-sm text-black/80'>{item.descricao}</h1>
                    </div>
                  </div>
                  <div className='z-10 absolute -top-10 -right-16  rounded-2xl bg-red-500 w-32 h-20 flex flex-col items-center p-5 justify-center '>
                    {
                      item.promocao?
                      <span className='text-4xl font-bold text-yellow-500 brightness-125 '>{(item.preco * 0.8).toFixed(2)}</span>
                      : 
                      <span className='text-4xl font-bold text-yellow-500 brightness-125 '>{(item.preco).toFixed(2)}</span>
                    }
                    {item.unOuKg ? <span className='text-base text-yellow-500 brightness-150  font-bold'>Unidade</span>:<span className='text-base text-yellow-500 brightness-150 font-bold'>Kilo</span> }
                  </div>
                </div>
              )
            })}
            </div>
         </div>
      </div>
    </main>
      <div className='w-full h-[200px] bg-gray-800 p-10'></div>
    </>
  );
}
