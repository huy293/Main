// routes/genreRoutes.js
const express = require('express');
const genreController = require('../controllers/genre.Controller');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', genreController.getAll);
router.get('/:id', genreController.getById);
router.post('/', authMiddleware(["admin", "moderator"]),genreController.create);
router.put('/:id', authMiddleware(["admin", "moderator"]),genreController.update);
router.delete('/:id', authMiddleware(["admin"]),genreController.delete);

module.exports = router;
