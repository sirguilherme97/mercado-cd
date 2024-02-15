import { Beef, CakeSlice, Croissant, Milk, ShoppingBasket } from "lucide-react";

export function Categoria() {
  return (
    <div className=' h-20 w-full flex gap-5 items-center px-5 justify-start '>
      <a className="p-2 hover:bg-red-700 transition-all bg-red-500 rounded-md" href="/"><ShoppingBasket size={20} className="text-white" /></a>
      <a className="p-2 hover:bg-red-700 transition-all bg-red-500 rounded-md" href="/categorias/bebidas"><Milk size={20} className="text-white" /></a>
      <a className="p-2 hover:bg-red-700 transition-all bg-red-500 rounded-md" href="/categorias/carnes"><Beef size={20} className="text-white" /></a>
      <a className="p-2 hover:bg-red-700 transition-all bg-red-500 rounded-md" href="/categorias/massas"><Croissant size={20} className="text-white" /></a>
      <a className="p-2 hover:bg-red-700 transition-all bg-red-500 rounded-md" href="/categorias/doces"><CakeSlice size={20} className="text-white" /></a>
    </div>
  )
}