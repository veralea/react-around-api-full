const express = require('express');
const {
  getAllUsers, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
// router.get('/:userId', getOneUser);
router.get('/me', getProfile);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);


module.exports = router;
