module.exports = function validateProfilInput(data) {
  let errors = {};

  function isEmpty(str) {
    return !str || /^\s+$/.test(str) || Object.keys(str).length === 0;
  }

  if (isEmpty(data.first_name)) errors.first_name = "Prénom vide";
  if (isEmpty(data.last_name)) errors.last_name = "Nom vide";
  if (isNaN(data.age)) errors.age = "Age doit être un nombre";
  if (data.age < 18 || data.age > 90) errors.age = "Age invalide";
  if (data.details && data.details.length > 200)
    errors.details = "Bio trop long !";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
