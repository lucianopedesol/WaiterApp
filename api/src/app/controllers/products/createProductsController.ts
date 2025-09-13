import {Request, Response} from 'express';
import {Product} from '../../models/ProductModel';

export async function createProductsController(req: Request, res: Response) {
  try {
    const { name, price, description, category, ingredients, active } = req.body;
    console.log(req.file);
    const imagePath = req.file?.filename;

    const product = await Product.create({
      name,
      price,
      description,
      imagePath,
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      active,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

//Crie um método que atualiza os valores de um produto existente no banco de dados.
//Ele deve receber o id do produto na URL e os novos valores no corpo da requisição.
//Se o produto não existir, retorne um erro 404.
//Se a atualização for bem-sucedida, retorne o produto atualizado.
//Certifique-se de validar os dados recebidos no corpo da requisição.
//Se algum campo obrigatório estiver faltando ou inválido, retorne um erro 400 com uma mensagem apropriada.
//Lembre-se de tratar possíveis erros que possam ocorrer durante a operação de atualização no banco de dados.
//Além disso, se uma nova imagem for enviada, atualize o campo imagePath com o nome do novo arquivo.
//Gere o código para este método.
export async function updateProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, price, description, category, ingredients, active } = req.body;
    const imagePath = req.file?.filename;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.ingredients = ingredients ? JSON.parse(ingredients) : product.ingredients;
    product.active = active === undefined ? product.active : active;
    if (imagePath) {
      product.imagePath = imagePath;
    }

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
