const Contact = require("../models/contact");
const ContactNumber = require("../models/contactNumber");

const getContact = async (req, res, next) => {
  let contact;
  try {
    contact = await Contact.find({}).populate("phone").exec();
  } catch (e) {
    return res.status(404).send(e.message);
  }

  res.status(200).json(contact);
};

const getContactById = async (req, res, next) => {
  let contact;
  try {
    contact = await Contact.find({ _id: req.params.contactId })
      .populate("phone")
      .exec();
  } catch (e) {
    return res.status(404).send(e.message);
  }

  res.status(200).json(contact);
};

const getContactNumbersType = (req, res, next) => {
  const contactNumbersType = {
    contactNumbersType:
      ContactNumber.schema.path("contactNumberType").enumValues,
  };

  res.status(200).json(contactNumbersType);
};

const postContact = async (req, res, next) => {
  let createdContactNumbers;
  let contactNumbersIds;
  let contact;
  let createdContact;

  try {
    createdContactNumbers = await ContactNumber.create(req.body.phone);

    contactNumbersIds = createdContactNumbers.map(
      (contactNumber) => contactNumber._id
    );

    contact = new Contact({
      name: req.body.name,
      phone: contactNumbersIds,
      photograph: req.body.photograph,
      address: req.body.address,
      email: req.body.email,
    });

    createdContact = await contact.save();
  } catch (e) {
    return res.status(400).send(e.message);
  }

  res.status(200).json(createdContact);
};

const putContact = (req, res, next) => {
  res.status(200).json({
    message: "Handling Put requests to /contacts",
  });
};

const deleteContact = async (req, res, next) => {
  try {
    await Contact.deleteOne({ _id: req.params.contactId });
  } catch (e) {
    return res.status(400).send(e.message);
  }

  res.status(200).json({
    message: "Contact successfully deleted",
  });
};

module.exports = {
  getContact,
  getContactById,
  getContactNumbersType,
  postContact,
  putContact,
  deleteContact,
};
