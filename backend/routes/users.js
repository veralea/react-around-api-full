const express = require('express');
const {
  getOneUser, getAllUsers, updateProfile, updateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getOneUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
