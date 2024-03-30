const fieldDuplication = (request, fields) => {
    Object.keys(request.body).forEach((key) => {
        if (!fields.includes(key)) { 
            throw ('fieldDuplication');
         }
    })

}

module.exports = fieldDuplication;