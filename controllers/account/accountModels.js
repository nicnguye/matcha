let sql = require("../../config/db.js");
const fs = require("fs");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "../../config/key/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "../../config/key/public.key")
);
const SENDGRID_KEY = fs.readFileSync(
  path.resolve(__dirname, "../../config/key/sendgrid.key")
);

/******* TOKEN *******/
exports.generateToken = user => {
  let payload = {
    id: user[0].id
  };
  let signOptions = {
    algorithm: "RS256",
    expiresIn: "24h"
  };
  let token = jwt.sign(payload, PRIVATE_KEY, signOptions);
  return token;
};

exports.verifyToken = (token, result) => {
  let signOptions = {
    algorithm: "RS256",
    expiresIn: "24h"
  };

  jwt.verify(token, PUBLIC_KEY, signOptions, (err, decoded) => {
    if (err) {
      result(err, null);
    } else {
      console.log("decoded", JSON.stringify(res));
      result(null, decoded);
    }
  });
};

exports.getValidationToken = (token, result) => {
  sql.query(
    "UPDATE user_account SET isEmailVerified = 1 WHERE confirmation_code = ?",
    [token],
    (err, res) => {
      console.log(res);
      if (err) result(err, null);
      if (!res || res.affectedRows === 0) result(null, 0);
      else {
        result(null, res);
      }
    }
  );
};

/******* USER SIGNUP *******/
exports.isMailExist = (email, result) => {
  sql.query(
    "SELECT * FROM user_account WHERE email = ?",
    [email],
    (err, res) => {
      if (err) result(err, null);
      if (!res || res.length === 0) {
        result(null, 0);
      } else {
        result(null, 1);
      }
    }
  );
};

exports.isUsernameExist = (nickname, result) => {
  sql.query(
    "SELECT * FROM user_account WHERE nickname = ?",
    [nickname],
    (err, res) => {
      if (err) result(err, null);
      if (!res || res.length === 0) {
        result(null, 0);
      } else {
        result(null, 1);
      }
    }
  );
};

exports.addNewUser = (newUser, result) => {
  sql.query("INSERT INTO user_account set ?", newUser, (err, res) => {
    if (err) result(err, null);
    else result(null, res.insertId);
  });
};

/******* USER INFO *******/
exports.getUserInfo = (mail, result) => {
  sql.query(
    "SELECT * FROM user_account WHERE email = ?",
    [mail],
    (err, res) => {
      if (err) result(err, null);
      else result(null, res);
    }
  );
};

exports.resetPassword = (user, result) => {
  sql.query(
    "UPDATE user_account SET isEmailVerified = 0, confirmation_code = ? WHERE email = ?",
    [user.confirmation_code, user.email],
    (err, res) => {
      if (err) result(err, null);
      else result(null, res);
    }
  );
};

exports.resetPasswordValidated = (user, result) => {
  sql.query(
    "UPDATE user_account SET isEmailVerified = 1, password = ? WHERE confirmation_code = ?",
    [user.password, user.confirmation_code],
    (err, res) => {
      if (err) result(err, null);
      if (!res || res.affectedRows === 0) result(null, 0);
      else result(null, res);
    }
  );
};

/******* MAIL *******/
exports.mailRegistration = user => {
  sgMail.setApiKey(SENDGRID_KEY);
  const msg = {
    to: user.email,
    from: "matcha@matcha.fr",
    subject: "Verification de compte: Matcha",
    text:
      "Bonjour " +
      user.nickname +
      " !\n\n" +
      "Vous pouvez valider votre compte Matcha sur ce lien: " +
      "http://localhost:3000/account-validation/" +
      user.confirmation_code +
      "\n"
  };
  sgMail.send(msg);
};

exports.mailPasswordReset = user => {
  sgMail.setApiKey(SENDGRID_KEY);
  const msg = {
    to: user.email,
    from: "matcha@matcha.fr",
    subject: "Matcha: Réinitialisation du mot de passe",
    text:
      "Bonjour " +
      user.nickname +
      " !\n\n" +
      "Vous pouvez réinitialiser le mot de passe de votre compte Matcha sur ce lien: " +
      "http://localhost:3000/reset-password/" +
      user.confirmation_code +
      "\n"
  };
  sgMail.send(msg);
};
