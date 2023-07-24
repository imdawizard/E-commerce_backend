const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    // Include associated Product data for each tag
    include: [
      {
        model: Product,
        through: ProductTag, // This ensures that Product data is included through the ProductTag table
        attributes: ['id', 'product_name', 'price', 'stock'], // Specify the attributes you want to include from the Product model
      },
    ],
  })
    .then((tags) => {
      res.json(tags); // Send the tags with their associated Product data as a response
    })
    .catch((err) => {
      res.status(500).json(err); // If there's an error, send an error response with status code 500
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    // Include associated Product data for the tag
    include: [
      {
        model: Product,
        through: ProductTag, // This ensures that Product data is included through the ProductTag table
        attributes: ['id', 'product_name', 'price', 'stock'], // Specify the attributes you want to include from the Product model
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        // If tag with the provided ID is not found, send a 404 response
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.json(tag); // Send the tag with its associated Product data as a response
    })
    .catch((err) => {
      res.status(500).json(err); // If there's an error, send an error response with status code 500
    });
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => {
      res.json(tag); // Send the newly created tag as a response
    })
    .catch((err) => {
      res.status(500).json(err); // If there's an error, send an error response with status code 500
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name, // Update the tag_name with the value provided in the request body
    },
    {
      where: {
        id: req.params.id, // Find the tag with the provided ID
      },
    }
  )
    .then((updatedTag) => {
      if (!updatedTag[0]) {
        // If no rows were affected, it means the tag with the provided ID was not found
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.json({ message: 'Tag updated successfully' }); // Send a success message as a response
    })
    .catch((err) => {
      res.status(500).json(err); // If there's an error, send an error response with status code 500
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id, // Find the tag with the provided ID
    },
  })
    .then((deletedTag) => {
      if (!deletedTag) {
        // If no rows were affected, it means the tag with the provided ID was not found
        res.status(404).json({ message: 'Tag not found' });
        return;
      }
      res.json({ message: 'Tag deleted successfully' }); // Send a success message as a response
    })
    .catch((err) => {
      res.status(500).json(err); // If there's an error, send an error response with status code 500
    });
});

module.exports = router;