const Contact = require("../models/contact");
const ContactNumber = require("../models/contactNumber");

const getContact = async (req, res, next) => {
  let contact;
  try {
    contact = await Contact.find({}).populate("phone").exec();

    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  let contact;
  try {
    contact = await Contact.find({ _id: req.params.contactId })
      .populate("phone")
      .exec();

    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

const getContactNumbersType = (req, res, next) => {
  try {
    const contactNumbersType = {
      contactNumbersType:
        ContactNumber.schema.path("contactNumberType").enumValues,
    };

    res.status(200).json(contactNumbersType);
  } catch (err) {
    next(err);
  }
};

const postContact = async (req, res, next) => {
  let createdContactNumbers;
  let contactNumbersIds;
  let contact;
  let createdContact;

  try {
    if (!req.file) {
      throw new Error("File is not found or fileType is wrong");
    }

    if (!req.body.phone) {
      throw new Error("Contact is required");
    }

    createdContactNumbers = await ContactNumber.create(
      JSON.parse(req.body.phone)
    );

    contactNumbersIds = createdContactNumbers.map(
      (contactNumber) => contactNumber._id
    );

    contact = new Contact({
      name: req.body.name,
      phone: contactNumbersIds,
      photograph: req.file.path,
      address: req.body.address,
      email: req.body.email,
      createdBy: req.userData.userId,
    });

    createdContact = await contact.save();

    res.status(200).json(createdContact);
  } catch (err) {
    next(err);
  }
};

const putContact = async (req, res, next) => {
  let createdContactNumbers;
  let contactNumbersIds;
  let photograph;
  try {
    createdContactNumbers = await ContactNumber.create(
      JSON.parse(req.body.phone)
    );

    contactNumbersIds = createdContactNumbers.map(
      (contactNumber) => contactNumber._id
    );

    const contact = await Contact.findById({ _id: req.params.contactId });

    if (req.file == undefined) {
      photograph = contact.photograph;
    } else {
      photograph = req.file.path;
    }

    Object.assign(contact, {
      name: req.body.name,
      phone: contactNumbersIds,
      photograph: photograph,
      address: req.body.address,
      email: req.body.email,
      createdBy: req.userData.userId,
    });

    await contact.save();

    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    await Contact.deleteOne({ _id: req.params.contactId });

    res.status(200).json({
      message: "Contact successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getContact,
  getContactById,
  getContactNumbersType,
  postContact,
  putContact,
  deleteContact,
};
