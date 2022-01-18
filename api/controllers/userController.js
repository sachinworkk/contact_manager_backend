const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const postUser = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              email: req.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) =>
                res.status(500).json({
                  error: err.message,
                })
              );
          }
        });
      }
    });
};

const postLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user === null) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user.id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).json({
            message: "Authentication Successful",
            token: token,
          });
        }

        return res.status(401).json({
          message: "Authentication Failed",
        });
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err.message,
      })
    );
};

module.exports = {
  postUser,
  postLogin,
};
