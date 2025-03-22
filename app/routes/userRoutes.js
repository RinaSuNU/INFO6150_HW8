const express = require('express');
const userController = require('../controller/userController'); 

const router = express.Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password  
 *                 example: "StrongPass123!"
 *             required:
 *              - fullName
 *              - email
 *              - password
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "User created successfully."
 *       '400':
 *         description: Bad Request - Validation Error
 *         content:
 *            application/json:
 *              example:
 *                error: "Validation failed."
 */
router.post('/create', userController.createUser);

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update user details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               fullName:
 *                 type: string
 *                 example: John Updated
 *               password:
 *                 type: string
 *                 example: "StrongPass123!"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: User not found
 */
router.put('/edit', userController.editUser);

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fullName:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john.doe@example.com
 *                       password:
 *                         type: string
 *                         example: hashed_password_here
 */
router.get('/getAll', userController.getAllUsers);

/**
 * @swagger
 * /user/uploadImage:
 *   post:
 *     summary: Upload an image for the user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Image uploaded successfully."
 *       400:
 *         description: Invalid file format or image already exists
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found."
 */
router.post('/uploadImage', userController.uploadImage);

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user by their email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/delete', userController.deleteUser);

module.exports = router;
