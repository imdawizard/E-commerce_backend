const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: Product,
    });
    res.json(categories);
  } catch (error) {
    res.json(500).json({ error: 'Error getting categories'});
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error getting category' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const { name } = req.body;
    await category.update({ name });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
});

module.exports = router;