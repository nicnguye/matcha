module.exports = function validateLoginInput(data) {
  let errors = {};

  function isEmpty(str) {
    return !str || /^\s+$/.test(str) || Object.keys(str).length === 0;
  }

  if (isEmpty(data.email)) errors.email = "Mail vide";
  if (isEmpty(data.password)) errors.password = "Mot de passe vide";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
