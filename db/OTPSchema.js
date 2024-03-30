db.createCollection("OTPInfo", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["OTPNumber", "OTPSentGmail", "userPassword", "userEmail", "userMobileNumber", "userFullName", "createdAt", "modifiedAt"],
            properties: {
                OTPNumber: {
                    bsonType: "string",
                    description: "OTPNumber must be a string and is required"
                },
                OTPSentGmail: {
                    bsonType: "string",
                    description: "OTPSentGmail must be a string and is required"
                },
                userPassword: {
                    bsonType: "string",
                    pattern: "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%&]).{10,}$",
                    description: "password must be a string and is required",
                },
                userEmail: {
                    bsonType: "string",
                    pattern: "^[a-zA-Z0-9._%+-]+@gmail\\.com$",
                    description: "userEmail must be a string and is required",
                },
                userMobileNumber: {
                    bsonType: "string",
                    pattern: '^[789]\\d{9}$',
                    description: "mobile must be a number and is required",
                },
                userFullName: {
                    bsonType: "string",
                    description: "userFullName must be a number and is required",
                },
                createdAt: {
                    bsonType: "date",
                    description: "createdAt must be a date and is required",
                },
                modifiedAt: {
                    bsonType: "date",
                    description: "modifiedAt must be a date and is required",
                },
            }
        }
    }
})