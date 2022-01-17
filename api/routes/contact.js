const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

/**
 * @swagger
 * /contacts:
 *     get:
 *       summary: Get all contacts
 *       tags:
 *          - Contact
 *     responses:
 *         200:
 *          description: Success
 */
router.get("/", contactController.getContact);

/**
 * @swagger
 * /contacts:
 *     get:
 *       summary: Get contacts by id
 *       tags:
 *          - Contact
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *         200:
 *          description: Success
 */
router.get("/:contactId", contactController.getContactById);

/**
 * @swagger
 * /contacts/numbers/type:
 *     get:
 *       summary: Get contact numbers type
 *       tags:
 *          - Contact
 *     responses:
 *         200:
 *          description: Success
 */
router.get("/numbers/type", contactController.getContactNumbersType);

/**
 * @swagger
 * /contacts:
 *     post:
 *        summary: Create a new contact
 *        tags:
 *           - Contact
 *     responses:
 *         200:
 *          description: Success
 */
router.post("/", contactController.postContact);

/**
 * @swagger
 * /contacts/{id}:
 *     put:
 *        summary: Update Contact
 *        tags:
 *           - Contact
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
 *         summary: Delete contact
 *         tags:
 *            - Contact
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *         200:
 *          description: Success
 */
router.delete("/:contactId", contactController.deleteContact);

module.exports = router;
