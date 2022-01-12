const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

/**
 * @swagger
 * /contacts:
 *     get:
 *       summary: Get all contacts
 *     responses:
 *         200:
 *          description: Success
 */
router.get("/", contactController.getContact);

/**
 * @swagger
 * /contacts:
 *     post:
 *        description: Create a new contact
 *     responses:
 *         200:
 *          description: Success
 */
router.post("/", contactController.postContact);

/**
 * @swagger
 * /contacts/{id}:
 *     put:
 *        description: Update Contact
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *         200:
 *          description: Success
 */
router.put("/:contactId", contactController.putContact);

/**
 * @swagger
 * /contacts/{id}:
 *     delete:
 *        description: Delete contact
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *         200:
 *          description: Success
 */
router.delete("/:contactId", contactController.deleteContact);

module.exports = router;
