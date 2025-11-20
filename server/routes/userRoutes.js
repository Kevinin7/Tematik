const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserStats
} = require('../controllers/userController');

router.get('/:id/stats', getUserStats); // ← esta debe ir antes de :id
router.get('/', getAllUsers);
router.post('/', createUser);

module.exports = router;