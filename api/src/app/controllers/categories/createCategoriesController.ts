import {Request, Response} from 'express';
import {Category} from '../../models/CategoryModel';

export async function createCategoriesController(req: Request, res: Response) {
  const { name, icon, active } = req.body;

  if (!name) return res.status(400).json({ error: 'Name is required '});
  if (!icon) return res.status(400).json({ error: 'Icon is required '});

  const category = await Category.create({ name, icon, active });

  res.status(201).json(category);
}

export async function updateCategoryController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, icon, active } = req.body;

    if (!name) return res.status(400).json({ error: 'Name is required '});
    if (!icon) return res.status(400).json({ error: 'Icon is required '});

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name || category.name;
    category.icon = icon || category.icon;
    category.active = active === undefined ? category.active : active;

    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
