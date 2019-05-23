module.exports = function validateRegisterInput(data) {
  let errors = {};

  function isEmpty(str) {
    return !str || /^\s+$/.test(str) || Object.keys(str).length === 0;
  }

  if (isEmpty(data.nickname)) errors.nickname = "Identifiant vide";
  if (isEmpty(data.email)) errors.email = "Mail vide";

  if (isEmpty(data.password)) errors.password = "Mot de passe vide";
  if (isEmpty(data.password2))
    errors.password2 = "Confirmer votre mot de passe";
  if (!(data.password === data.password2))
    errors.password2 = "Mot de passe différent";
  if (data.password.length < 6)
    errors.password = "Mot de passe doit contenir minimum 6 caractères";

  if (isEmpty(data.first_name)) errors.first_name = "Prénom vide";
  if (isEmpty(data.last_name)) errors.last_name = "Nom vide";
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
