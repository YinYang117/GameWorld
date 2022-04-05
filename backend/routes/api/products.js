const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {Product} = require('../../db/models');

const validateProduct = [
  check('productTitle')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a Title for your Product")
    .isLength({ min: 4 })
    .withMessage("Your Product's Title must have at least 4 characters")
    .isLength({ max: 40 })
    .withMessage("Your Product's Title can not be longer then 40 characters"),
  check('mainImage')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('MainImage url has a minimum of 4 characters')
    .isLength({ max: 256 })
    .withMessage('MainImage url has a 256 character limit'),
  check('mainImageAlt')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('MainImage url has a minimum of 2 characters')
    .isLength({ max: 256 })
    .withMessage('MainImage has a 256 character limit'),
  check('description')
    .exists({ checkFalsy: true })
    .isLength({ min: 40 })
    .withMessage('Please provide a description of 40 characters or more')
    .isLength({ max: 512 })
    .withMessage('Description has a 512 character limit'),
  handleValidationErrors
];

router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.allProducts();
  return res.json({ products })
}));

router.post('/new', validateProduct, asyncHandler(async (req, res) => {
  const { userId, world, location, mainImage, mainImageAlt, description, price } = req.body;
  const product = await Product.create({ userId, world, location,  mainImage, mainImageAlt, description, price });
  return res.json(product);
}));

router.put('/:productId', asyncHandler(async (req, res) => {
  const { world, location, mainImage, mainImageAlt, description, price } = req.body;
  const productId = parseInt(req.params.productId, 10);
  const product = await Product.findByPk(productId);
  product.update({ world, location, mainImage, mainImageAlt, description, price })
  
  res.json({})
}));

router.delete('/:productId', asyncHandler(async (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  const doomedProduct = await Product.findByPk(productId);
  await doomedProduct.destroy();
  res.json({})
  // ^ do I need this on a delete?
}));