db.createCollection("user", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["fullName", "email", "mobile", "teamKey", "role", "createdAt", "modifiedAt"],
            properties: {
                fullName: {
                    bsonType: "string",
                    description: "fullName must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    pattern: "^[a-zA-Z0-9._%+-]+@gmail\\.com$",
                    description: "password must be a string and is required",
                },
                mobile: {
                    bsonType: "string",
                    pattern: '^[789]\\d{9}$',
                    description: "mobile must be a number and is required",
                },
                teamKey: {
                    bsonType: "string",
                    description: "teamKey must be a string and is required"
                },
                role: {
                    bsonType: "string",
                    description: "role must be a string and is required"
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