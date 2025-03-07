const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;