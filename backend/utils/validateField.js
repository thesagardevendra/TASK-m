const validateField = (field, type, regex) => {
    if (field == undefined || field === "" || typeof field !== type || (regex && !regex.test(field.toString()))) {
        throw ('Unprocessable Entity');
    }
}

module.exports = validateField;