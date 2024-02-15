"use client"

import React, { useEffect, useState } from 'react';
import { getAllProducts, createProduct, publishProduct } from '../../../_utils/graphApi';
import { Nav } from '../../../../components/Nav';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Page() {
  const {userId} = auth
  if(userId){
    redirect('/')
  }
  const [product, setProduct] = useState([]);
  const [newProductData, setNewProductData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    url: "",
    nomeEmpresa: "",
    unOuKg: false,
    promocao: {
      ePromo: false
    }
  });

  useEffect(() => {
    getAllProducts()
      .then(resp => {
        console.log(resp);
        setProduct(resp?.produtos);
      })
      .catch(error => {
        console.error("Error getting product list:", error);
      });
  }, []);

  const handleCreateProduct = async () => {
    if (newProductData.nome.trim() !== "") {
      // Convertendo o preço para um número de ponto flutuante
      const precoFloat = parseFloat(newProductData.preco);
      
      if (!isNaN(precoFloat)) { // Verifica se o preço é um número válido
        try {
          // Check if a product with the same name already exists
          const existingProduct = product.find(prod => prod.nome === newProductData.nome);
          if (existingProduct) {
            alert("Um produto com o mesmo nome já existe. Por favor, escolha outro nome.");
            return;
          }
          
          // Update the newProductData object with the parsed precoFloat
          const updatedProductData = { ...newProductData, preco: precoFloat };
  
          // Create the new product if the name is unique
          const createResult = await createProduct(updatedProductData);
          const productId = createResult?.createProduto?.id;
  
          if (productId) {
            await publishProduct(productId); // Publicar o produto após criá-lo
          }
          // Clear the form after successfully creating the product
          setNewProductData({
            nome: "",
            descricao: "",
            preco: "",
            url: "",
            nomeEmpresa: "",
            unOuKg: false,
            promocao:{
              ePromo: false
            }
          });
        } catch (error) {
          console.error("Error creating product:", error);
        }
      } else {
        alert("Por favor, insira um preço válido para o novo produto.");
      }
    } else {
      alert("Por favor, insira um nome para o novo produto.");
    }
  };
  
  
  
  
  const handleChange = (field, value) => {
    if (field.startsWith("promocao")) {
      // If the field is nested inside the promocao object
      const promocaoField = field.split(".")[1]; // Extract the field name
      setNewProductData({ 
        ...newProductData, 
        promocao: {
          ...newProductData.promocao,
          [promocaoField]: value
        }
      });
    } else {
      setNewProductData({ ...newProductData, [field]: value });
    }
  };
  

  return (
    <>
      <Nav/>
      <main className='w-screen h-auto px-10'>
        <div className='w-2/4 h-auto mt-10'>
          <div className="flex flex-col gap-4 justify-between items-center w-full h-auto px-5">
            <input
              type="text"
              placeholder="Nome do Produto"
              value={newProductData.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              className="w-full h-10 p-2 mr-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              placeholder="Descrição do Produto"
              value={newProductData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              className="w-full h-10 p-2 mr-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
            />
            <input
              type="number"
              placeholder="Preço Produto"
              value={newProductData.preco}
              onChange={(e) => handleChange("preco", e.target.value)}
              className="w-full h-10 p-2 mr-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              placeholder="URL da Imagem do Produto"
              value={newProductData.url}
              onChange={(e) => handleChange("url", e.target.value)}
              className="w-full h-10 p-2 mr-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              placeholder="Nome da Empresa"
              value={newProductData.nomeEmpresa}
              onChange={(e) => handleChange("nomeEmpresa", e.target.value)}
              className="w-full h-10 p-2 mr-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="mt-10 flex justify-between items-center w-full h-auto px-5">
            <button onClick={handleCreateProduct} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">Criar Produto</button>
          </div>
        </div>
        <div className='flex flex-col p-10 gap-5  items-start justify-start h-full font-medium'>
          <div className='flex-col'>
            <h2 className="font-bold text-2xl mt-20">Todos os Produtos</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mt-5 w-full'>
              {product?.map((item, index) => (
                <div key={index} className='grid col-span-1 mt-10 relative h-auto'>
                  <h1>{item.nome}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className='w-full h-[200px] bg-gray-800 p-10'></div>
    </>
  );
}
