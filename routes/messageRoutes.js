const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Enviar mensagem para outro usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensagem enviada
 *       400:
 *         description: Erro de validação
 *   get:
 *     summary: Listar mensagens do usuário logado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mensagens
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, messageController.sendMessage);
router.get('/', authMiddleware, messageController.listMessages);

module.exports = router;
