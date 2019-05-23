let sql = require("../../config/db.js");
const bcrypt = require("bcrypt");

const validateProfilInput = require("../../formValidation/profilValidation");
const validateProfilSettingsInput = require("../../formValidation/profilSettingsValidation");

exports.uploadPhoto = (req, res) => {
  if (req.params && req.params.id) {
    req.files.forEach(file => {
      let pathImage = "/images/uploads/" + file.filename;
      let str = "";
      str =
        "SELECT * FROM user_photo WHERE user_account_id = ? AND profil_image = ?";
      sql.query(str, [req.params.id, file.fieldname], (err, exist) => {
        if (err) res.status(500).json("Erreur Interne");
        if (file.fieldname === "profil1") {
          sql.query(
            "UPDATE user_account SET profil_image = ? WHERE id = ?",
            [pathImage, req.params.id],
            (err2, res2) => {
              if (err2) res.status(500).json("Erreur Interne");
            }
          );
        } else if (!exist || exist.length === 0) {
          str =
            "INSERT INTO user_photo (user_account_id, link, profil_image) VALUES (?, ?, ?)";
          sql.query(
            str,
            [req.params.id, pathImage, file.fieldname],
            (err, res1) => {
              if (err) res.status(500).json("Erreur Interne");
            }
          );
        } else {
          str =
            "UPDATE user_photo SET link = ? WHERE user_account_id = ? AND profil_image = ?";
          sql.query(
            str,
            [pathImage, req.params.id, file.fieldname],
            (err3, res3) => {
              if (err3) res.status(500).json("Erreur Interne");
            }
          );
        }
      });
    });
    res.status(200).json("Photo modifié");
  } else res.status(500).json("Erreur ID inconnue");
};

exports.getPhoto = (req, res) => {
  if (req.params && req.params.id) {
    sql.query(
      "SELECT * FROM user_photo WHERE user_account_id = ?",
      [req.params.id],
      (err, result) => {
        if (err) res.status(500).json("Erreur Interne");
        else res.status(200).json(result);
      }
    );
  } else res.status(500).json("Erreur ID inconnue");
};

exports.userInfo = (req, res) => {
  sql.query(
    "SELECT user_account.*, geolocalisation.latitude, geolocalisation.longitude FROM user_account LEFT JOIN geolocalisation ON user_account.id = geolocalisation.user_account_id WHERE user_account.id = ?",
    [req.body.id],
    (error, response) => {
      if (response) {
        res.status(200).json(response[0]);
      } else res.status(400).json(error);
    }
  );
};

const nicknameTaken = (data, result) => {
  sql.query(
    "SELECT * FROM user_account WHERE nickname = ? AND id NOT LIKE ?",
    [data.nickname, data.id],
    (err, res) => {
      if (err) {
        return result(err, null);
      }
      if (!res || res.length === 0) {
        result(null, 0);
      } else result(null, 1);
    }
  );
};

const emailTaken = (data, result) => {
  sql.query(
    "SELECT * FROM user_account WHERE email = ? AND id NOT LIKE ?",
    [data.email, data.id],
    (err, res) => {
      if (err) {
        return result(err, null);
      }
      if (!res || res.length === 0) {
        result(null, 0);
      } else result(null, 1);
    }
  );
};

exports.updateProfilUser = (req, res) => {
  const { errors, isValid } = validateProfilInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else
    sql.query(
      "UPDATE user_account SET ? WHERE id = ?",
      [req.body, req.params.id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.json({ message: "Erreur Interne" });
        }
        if (!result || result.affectedRows === 0)
          res.status(400).json({ message: "Utilisateur inconnu" });
        else {
          res.status(200).json({ message: "Utilisateur modifié" });
        }
      }
    );
};

exports.updateUser = (req, res) => {
  if (!req.body.nickname && !req.body.email)
    return res.json({ message: "Entrer un pseudo et email" });
  else {
    if (req.body.nickname) {
      let newData = {
        nickname: req.body.nickname,
        id: req.body.id,
        email: req.body.email
      };
      nicknameTaken(newData, (err, result) => {
        if (err) console.log(err);
        if (result === 1) res.json({ message: "Pseudo déjà utilisé" });
        else {
          emailTaken(newData, (err2, result2) => {
            if (err2) console.log(err2);
            if (result2 === 1) res.json({ message: "Email déjà utilisé" });
            else
              sql.query(
                "UPDATE user_account SET nickname = ?, email = ? WHERE id = ?",
                [newData.nickname, newData.email, newData.id],
                (err3, result3) => {
                  if (err3) console.log(err3);
                  else res.status(200).json({ message: "Utilisateur modifié" });
                }
              );
          });
        }
      });
    }
  }
};

exports.updatePassword = (req, res) => {
  const { errors, isValid } = validateProfilSettingsInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const data = req.body;
    bcrypt.compare(data.old_password.trim(), data.old_pwd, (err, valid) => {
      if (err) console.log(err);
      if (!valid)
        return res.status(500).json({ password: "Ancien mot de passe faux" });
      else {
        let pwd = bcrypt.hashSync(data.password1.trim(), 10);
        sql.query(
          "UPDATE user_account SET password = ? WHERE id = ?",
          [pwd, data.id],
          (err1, result) => {
            if (err1) console.log(err1);
            else {
              console.log(result);
              if (!result || result.affectedRows === 0)
                res.status(400).json({ message: "Utilisateur inconnu" });
              res
                .status(200)
                .json({ password: "Mot de passe modifié", new_pwd: pwd });
            }
          }
        );
      }
    });
  }
};

/*     REQUETES A UTILISER   */
exports.blockUser = (req, res) => {
  if (
    req.body &&
    req.body.user_account_id &&
    req.body.user_account_id_blocked
  ) {
    let user = req.body;
    sql.query(
      "INSERT INTO block_user SET ?",
      [user.user_account_id, user.user_account_id_blocked],
      (err, res) => {
        if (err) res.status(500).json("Erreur Interne");
        else res.status(200).json("Utilisateur bloqué");
      }
    );
  } else res.status(400).json("Erreur id");
};

exports.getBlockedUser = (req, res) => {
  if (req.params && req.params.id) {
    sql.query(
      "SELECT * FROM block_user WHERE user_account_id = ?",
      [req.params.id],
      (err, res) => {
        if (err) res.status(500).json("Erreur Interne");
        else res.status(200).json(res[0]);
      }
    );
  } else res.status(400).json("Parametre ID inconnu");
};

exports.gradeUser = (req, res) => {
  if (
    req.body &&
    req.body.user_account_id_given &&
    req.body.user_account_id_received &&
    req.body.grade
  ) {
    let user = req.body;
    sql.query(
      "INSERT INTO grade SET ?",
      [
        user.user_account_id_given,
        user.user_account_id_received,
        req.body.grade
      ],
      (err, res) => {
        if (err) res.status(500).json("Erreur Interne");
        else res.status(200).json("Utilisateur liké/disliké");
      }
    );
  } else res.status(400).json("Erreur id");
};

exports.getGradedUser = (req, res) => {
  if (req.params && req.params.id) {
    sql.query(
      "SELECT * FROM grade WHERE user_account_id_given = ?",
      [req.params.id],
      (err, res) => {
        if (err) res.status(500).json("Erreur Interne");
        else res.status(200).json(res[0]);
      }
    );
  } else res.status(400).json("Parametre ID inconnu");
};

exports.getGoodGrade = (req, res) => {
  if (req.params && req.params.id) {
    sql.query(
      "SELECT * FROM grade WHERE user_account_received = ? AND grade = '1'",
      [req.params.id],
      (err, res) => {
        if (err) res.status(500).json("Erreur interne");
        else res.status(200).json(res[0]);
      }
    );
  } else res.status(400).json("Parametre ID inconnu");
};

exports.addTags = (req, res) => {
  if (req.body && req.body.user_account_id && req.body.tag_name) {
    sql.query(
      "INSERT INTO tags SET ?",
      [req.body.user_account_id, req.body.tag_name],
      (err, res) => {
        if (err) res.status(500).json({ Erreur: err });
        else res.status(200).json("Tag ajouté");
      }
    );
  } else res.status(400).json("Champ Vide");
};

exports.deleteTags = (req, res) => {
  if (req.params && req.params.id && req.body && req.body.tag_name) {
    sql.query(
      "DELETE * FROM tags WHERE user_account_id = ? AND tag_name = ?",
      [req.params.id, req.body.tag_name],
      (err, res) => {
        if (err) res.status(500).json({ Erreur: err });
        else res.status(200).json("Tag Supprimé");
      }
    );
  } else res.status(400).json("Parametre ID inconnu");
};

exports.getTags = (req, res) => {
  if (req.params && req.params.id) {
    sql.query(
      "SELECT * FROM tags WHERE user_account_id = ?",
      [req.params.id],
      (err, res) => {
        if (err) res.status(500).json({ Erreur: err });
        else res.status(200).json("Tag trouvé");
      }
    );
  } else res.status(400).json("Erreur ID inconnue");
};
