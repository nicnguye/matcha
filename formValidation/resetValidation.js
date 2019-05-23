module.exports = function validateResetInput(data, type) {
  let errors = {};

  function isEmpty(str) {
    return !str || /^\s+$/.test(str) || Object.keys(str).length === 0;
  }
  if (type === 1) {
    if (isEmpty(data.email)) errors.email = "Mail vide";
  } else if (type === 2) {
    if (isEmpty(data.password)) errors.password = "Mot de passe vide";
    if (isEmpty(data.password2))
      errors.password2 = "Confirmer votre mot de passe";
    if (!(data.password === data.password2))
      errors.password2 = "Mot de passe différent";
    if (data.password.length < 6)
      errors.password = "Mot de passe doit contenir minimun 6 caractères";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
