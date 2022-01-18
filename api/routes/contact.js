const express = require("express");
const router = express.Router();

const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const uploadFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: uploadFilter,
});

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
router.get("/", checkAuth, contactController.getContact);

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
router.get("/:contactId", checkAuth, contactController.getContactById);

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
router.get("/numbers/type", checkAuth, contactController.getContactNumbersType);

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
router.post(
  "/",
  checkAuth,
  upload.single("photograph"),
  contactController.postContact
);

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
router.put(
  "/:contactId",
  checkAuth,
  upload.single("photograph"),
  contactController.putContact
);

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
router.delete("/:contactId", checkAuth, contactController.deleteContact);

module.exports = router;
