import { gql, request } from 'graphql-request';

const MAIN_URL = "https://api-sa-east-1.hygraph.com/v2/" + process.env.NEXT_PUBLIC_HYGRAPH_API_KEY + "/master";

export const getAllProducts = async () => {
  const query = gql`
    query MyQuery {
      produtos {
        id
        nome
        descricao
        preco
        url
        nomeEmpresa
        unOuKg
        promocao {
          ePromo
        }
      }
    }
  `;
  try {
    const result = await request(MAIN_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error;
  }
};

export const getAllProductsPromo = async () => {
  const query = gql`
    query MyQuery {
      produtos(where: {promocao: {}}) {
        id
        nome
        descricao
        preco
        url
        nomeEmpresa
        unOuKg
      }
    }
  `;
  try {
    const result = await request(MAIN_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error;
  }
};

export const createProduct = async (newProductData) => {
  const { nome, descricao, preco, url, nomeEmpresa, unOuKg } = newProductData;
  const query = gql`
    mutation CreateProduct($newProductData: ProdutoCreateInput!) {
      createProduto(data: $newProductData) {
        id
      }
    }
  `;

  try {
    const result = await request(MAIN_URL, query, {
      newProductData: {
        nome,
        descricao,
        preco,
        url,
        nomeEmpresa,
        unOuKg
      }
    });

    // Verificar se o produto foi criado com sucesso
    if (result.createProduto) {
      // Se o produto foi criado com sucesso, publicá-lo
      await publishProduct(result.createProduto.id);
    }

    return result;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const publishProduct = async (productId) => {
  const query = gql`
    mutation PublishProduct($productId: ID!) {
      publishProduto(where: { id: $productId }) {
        id
      }
    }
  `;

  try {
    const result = await request(MAIN_URL, query, {
      productId
    });
    return result;
  } catch (error) {
    console.error("Error publishing product:", error);
    throw error;
  }
};