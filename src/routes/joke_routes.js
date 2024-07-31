const express = require("express");
const router = express.Router();
const { submitJokeForModeration, getJokeById, updateJokeById, deleteJokeById, approveJoke, rejectJoke, getAllJokes, submitJokeType } = require("../controllers/joke_controller");
const authenticateJWT = require("../middlewares/auth_middleware");

/**
 * @swagger
 * tags:
 *   name: Moderation
 *   description: API to moderate jokes
 */

/**
 * @swagger
 * /api/joke:
 *   post:
 *     summary: Submit a new joke for moderation
 *     tags: [Moderation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Why did the scarecrow win an award? Because he was outstanding in his field!"
 *               type:
 *                 type: string
 *                 example: "Comedy"
 *     responses:
 *       201:
 *         description: Joke submitted for moderation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 joke:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     content:
 *                       type: string
 *                     type:
 *                       type: string
 *                     status:
 *                       type: string
 *       500:
 *         description: Failed to submit joke
 */
router.post("/joke", authenticateJWT, submitJokeForModeration);

/**
 * @swagger
 * /api/joke/{id}:
 *   get:
 *     summary: Get a joke by ID
 *     tags: [Moderation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joke details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 content:
 *                   type: string
 *                 type:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Joke not found
 *       500:
 *         description: Failed to retrieve joke
 */
router.get("/joke/:id", authenticateJWT, getJokeById);

router.get("/jokes", authenticateJWT, getAllJokes);

/**
 * @swagger
 * /api/joke/{id}:
 *   put:
 *     summary: Update a joke by ID
 *     tags: [Moderation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Why don't scientists trust atoms? Because they make up everything!"
 *               type:
 *                 type: string
 *                 example: "Science"
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *                 example: "pending"
 *     responses:
 *       200:
 *         description: Joke updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 joke:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     content:
 *                       type: string
 *                     type:
 *                       type: string
 *                     status:
 *                       type: string
 *       404:
 *         description: Joke not found
 *       500:
 *         description: Failed to update joke
 */
router.put("/joke/:id", authenticateJWT, updateJokeById);

/**
 * @swagger
 * /api/joke/{id}:
 *   delete:
 *     summary: Delete a joke by ID
 *     tags: [Moderation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joke deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Joke not found
 *       500:
 *         description: Failed to delete joke
 */
router.delete("/joke/:id", authenticateJWT, deleteJokeById);

/**
 * @swagger
 * /api/joke/{id}/approve:
 *   put:
 *     summary: Approve a joke and submit to the Deliver Jokes microservice
 *     tags: [Moderation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joke approved and submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 joke:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     content:
 *                       type: string
 *                     type:
 *                       type: string
 *                     status:
 *                       type: string
 *       404:
 *         description: Joke not found
 *       400:
 *         description: Joke has already been processed
 *       500:
 *         description: Failed to approve joke
 */
router.put("/joke/:id/approve", authenticateJWT, approveJoke);

/**
 * @swagger
 * /api/joke/{id}/reject:
 *   put:
 *     summary: Reject a joke
 *     tags: [Moderation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joke rejected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 joke:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     content:
 *                       type: string
 *                     type:
 *                       type: string
 *                     status:
 *                       type: string
 *       404:
 *         description: Joke not found
 *       400:
 *         description: Joke has already been processed
 *       500:
 *         description: Failed to reject joke
 */
router.put("/joke/:id/reject", authenticateJWT, rejectJoke);

router.post("/joke-type", authenticateJWT, submitJokeType);

module.exports = router;
