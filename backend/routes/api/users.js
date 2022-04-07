const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Please provide a username with at least 3 characters.')
    .isLength({ max: 60 })
    .withMessage('Please provide a username no longer than 60 characters.')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.')
    .isLength({ min: 6 })
    .withMessage('Please provide an email with at least 6 characters.')
    .isLength({ max: 60 })
    .withMessage('Please provide an email no longer than 256 characters.'),,
  check('firstname')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a first name at least 2 characters long.')
    .isLength({ max: 60 })
    .withMessage('Please provide a first name no longer than 60 characters.'),
  check('lastname')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a last name at least 2 characters long.')
    .isLength({ max: 100 })
    .withMessage('Please provide a last name no longer than 100 characters.'),
  check('lastname')
    .isLength({ min: 2 })
    .withMessage('Please provide a last name at least 2 characters long.')
    .isLength({ max: 100 })
    .withMessage('Please provide a last name no longer than 100 characters.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Password must be 4 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { username, email, firstname, lastname, title, password, } = req.body;
  const user = await User.signup({ username, email, firstname, lastname, title, password, });

  await setTokenCookie(res, user);
  return res.json({ user });
})
);

module.exports = router;