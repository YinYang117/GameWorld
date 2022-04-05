const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {Tag} = require('../../db/models');

const validateTags = [
  check('tags')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please write a Message for your Tag post")
    .isLength({ min: 2 })
    .withMessage("Tags can not be less than 2 characters")
    .isLength({ max: 30 })
    .withMessage("Tags can not be more than 30 characters"),
  handleValidationErrors
];

router.get('/', asyncHandler(async (req, res) => {
  const tags = await Tag.findAll();
  return res.json({ tags })
}));

// router.get('/product/:productId', asyncHandler(async (req, res) => {
//   return await Tag.findAll({ where: { productId }})
// }));
// I think this will need to query through product tags table

router.post('/new', validateTag, asyncHandler(async (req, res) => {
  const { tags } = req.body;
  const tag = await Tag.create({ tags });
  return res.json(tag);
}));

// Put will only change the Message!!! On purpose
router.put('/:tagId', asyncHandler(async (req, res) => {
  const { message } = req.body;
  const tagId = parseInt(req.params.tagId, 10);
  const tag = await Tag.findByPk(tagId);
  tag.update({ message })
  
  res.json({})
}));

router.delete('/:tagId', asyncHandler(async (req, res) => {
  const tagId = parseInt(req.params.tagId, 10);
  const doomedTag = await Tag.findByPk(tagId);
  await doomedTag.destroy();
  res.json({})
  // ^ do I need this on a delete? no return either...
}));