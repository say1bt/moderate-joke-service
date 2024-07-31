const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../controllers/auth_controller");

/**
 * @swagger
 * /api/authenticate:
 *   post:
 *     summary: Authenticate the user and get a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Authentication failed
 */
router.post("/authenticate", authenticateUser);

module.exports = router;
