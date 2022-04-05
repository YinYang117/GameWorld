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
    .withMessage("Please write a Message for your Discussion post"),
  handleValidationErrors
];

router.get('/', asyncHandler(async (req, res) => {
  const discussions = await Discussion.findAll();
  return res.json({ discussions })
}));

router.get('/user/:userId', asyncHandler(async (req, res) => {
  return await Discussion.findAll({ where: { userId }})
}));

router.post('/new', validateDiscussion, asyncHandler(async (req, res) => {
  const { userId, productId, message } = req.body;
  const discussion = await Discussion.create({ userId, productId, message });
  return res.json(discussion);
}));

// Put will only change the Message!!! On purpose
router.put('/:discussionId', asyncHandler(async (req, res) => {
  const { message } = req.body;
  const discussionId = parseInt(req.params.discussionId, 10);
  const discussion = await Discussion.findByPk(discussionId);
  discussion.update({ message })
  
  res.json({})
}));

router.delete('/:discussionId', asyncHandler(async (req, res) => {
  const discussionId = parseInt(req.params.discussionId, 10);
  const doomedDiscussion = await Discussion.findByPk(discussionId);
  await doomedDiscussion.destroy();
  res.json({})
  // ^ do I need this on a delete? no return either...
}));

module.exports = router;