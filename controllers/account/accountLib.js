const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Users = require("./accountModels");

const saltRounds = 10;

const validateRegisterInput = require("../../formValidation/registerValidation");
const validateLoginInput = require("../../formValidation/loginValidation");
const validateResetInput = require("../../formValidation/resetValidation");

exports.signup = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let newUser = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password.trim(), saltRounds),
    first_name: req.body.first_name.trim(),
    last_name: req.body.last_name.trim(),
    nickname: req.body.nickname.trim(),
    isEmailVerified: 0,
    profil_image: "/images/profil1.jpeg",
    confirmation_code: crypto.randomBytes(16).toString("hex"),
    popularity: 500
  };

  Users.isMailExist(newUser.email, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur Interne" });
    if (result === 1)
      return res.status(400).json({ email: "L'adresse mail existe déjà" });
    else {
      Users.isUsernameExist(newUser.nickname, (err2, result2) => {
        if (err2) return res.status(500).json({ message: "Erreur Interne" });
        if (result2 === 1)
          return res.status(400).json({ nickname: "Ce pseudo existe déjà" });
        Users.addNewUser(newUser, (err, user) => {
          if (err) return res.status(500).json({ message: "Erreur Interne" });
          else {
            Users.mailRegistration(newUser);
            return res.status(200).json({
              message:
                "Utilisateur enregistré, veuillez confirmer le mail de validation !",
              confirmation_code: newUser.confirmation_code
            });
          }
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Users.getUserInfo(req.body.email.trim(), (err, userExist) => {
    if (err) return res.status(500).json("Erreur Interne");
    if (!userExist || userExist.length === 0) {
      return res.status(400).json({ message: "L'adresse mail n'existe pas!" });
    } else {
      bcrypt.compare(
        req.body.password.trim(),
        userExist[0].password,
        (err, valid) => {
          if (err) return res.status(500).json({ message: "Erreur Interne" });
          if (!valid)
            return res.status(401).json({ password: "Mot de passe erroné" });
          if (!userExist[0].isEmailVerified)
            return res
              .status(401)
              .json({ message: "Activez le mail de confirmation" });
          let token = Users.generateToken(userExist);
          return res.status(200).json({
            message: "Authentification réussi",
            token: token
          });
        }
      );
    }
  });
};

exports.passwordResetMail = (req, res) => {
  const { errors, isValid } = validateResetInput(req.body, (type = 1));
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Users.getUserInfo(req.body.email.trim(), (err, userExist) => {
    if (err) return res.status(500).json("Erreur Interne");
    if (!userExist || userExist.length === 0) {
      return res.status(400).json({ message: "L'adresse Mail n'existe pas!" });
    } else {
      let newUser = {
        email: userExist[0].email,
        nickname: userExist[0].nickname,
        confirmation_code: crypto.randomBytes(16).toString("hex")
      };
      Users.resetPassword(newUser, (err, user) => {
        if (err) return res.status(500).json({ message: "Erreur Interne" });
        else {
          Users.mailPasswordReset(newUser);
          return res
            .status(200)
            .json({ message: "Mail de reinitialisation envoyé" });
        }
      });
    }
  });
};

exports.passwordResetValidation = (req, res) => {
  const { errors, isValid } = validateResetInput(req.body, (type = 2));
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let newUser = {
    password: bcrypt.hashSync(req.body.password.trim(), saltRounds),
    confirmation_code: req.params.token
  };
  Users.resetPasswordValidated(newUser, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur interne" });
    if (result === 0) return res.status(400).json({ message: "Lien invalide" });
    else
      return res
        .status(200)
        .json({ message: "Nouveau Mot de passe enregistré ! Redirection..." });
  });
};

exports.accountValidation = (req, res) => {
  Users.getValidationToken(req.params.token, (err, user) => {
    if (err) return res.status(500).json({ message: "Erreur Interne" });
    if (!user || user === 0)
      return res.status(400).json({ message: "Lien invalide !" });
    else return res.status(200).json({ message: "Token valide !" });
  });
};
