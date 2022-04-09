const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {Discussion} = require('../../db/models');

const validateDiscussion = [
  check('message')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please write a Message for your Discussion post")
    .isLength({ min: 40 })
    .withMessage("Please provide a discussion at least 40 characters long"),
  handleValidationErrors
];

router.get('/', asyncHandler(async (req, res) => {
  const discussions = await Discussion.findAll();
  return res.json(discussions)
}));

router.get('/product/:productId', asyncHandler(async (req, res) => {
  prodDiscussions = await Discussion.findAll({ where: { productId: req.params.productId }})
  return res.json(prodDiscussions)
}));

router.get('/user/:userId', asyncHandler(async (req, res) => {
  return await Discussion.findAll({ where: { userId: req.params.userId }})
}));

router.post('/new', validateDiscussion, asyncHandler(async (req, res) => {
  const { userId, productId, message } = req.body;
  const discussion = await Discussion.create({ userId, productId, message });
  return res.json(discussion);
}));

// Put will only change the Message! On purpose
router.put('/:discussionId', asyncHandler(async (req, res) => {
  const { message } = req.body;
  const discussionId = parseInt(req.params.discussionId, 10);
  const discussion = await Discussion.findByPk(discussionId);
  discussion.update({ message })
  
  res.json({})
}));

router.delete('/:discussionId', asyncHandler(async (req, res) => {
  const doomedDiscussion = await Discussion.findByPk(req.params.discussionId);
  // ^ saves 1 line of code if it works
  await doomedDiscussion.destroy();
  res.json({})
}));

module.exports = router;