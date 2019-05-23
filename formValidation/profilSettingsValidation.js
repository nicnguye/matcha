module.exports = function validateProfilSettingsInput(data) {
  let errors = {};

  function isEmpty(str) {
    return !str || /^\s+$/.test(str) || Object.keys(str).length === 0;
  }

  if (isEmpty(data.password1) || isEmpty(data.password2))
    errors.password = "Mot de passe vide";
  if (!(data.password1 === data.password2))
    errors.password = "Mot de passe différent";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
