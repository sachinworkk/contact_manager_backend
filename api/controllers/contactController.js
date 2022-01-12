const getContact = (req, res, next) => {
  res.status(200).json({
    message: "Handling Get requests to /contacts",
  });
};

const postContact = (req, res, next) => {
  res.status(200).json({
    message: "Handling Post requests to /contacts",
  });
};

const putContact = (req, res, next) => {
  res.status(200).json({
    message: "Handling Put requests to /contacts",
  });
};

const deleteContact = (req, res, next) => {
  res.status(200).json({
    message: "Handling Delete requests to /contacts",
  });
};

module.exports = { getContact, postContact, putContact, deleteContact };
