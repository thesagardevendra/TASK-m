db.createCollection("task", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["projectName", "issueType", "summary", "priority", "description", "assignee", "createdBy", "startDate", "endDate", "createdAt", "modifiedAt"],
            properties: {
                projectName: {
                    bsonType: "string",
                    description: "projectName must be a string and is required"
                },
                issueType: {
                    bsonType: "string",
                    description: "issueType must be a string and is required"
                },
                summary: {
                    bsonType: "string",
                    description: "summary must be a string and is required"
                },
                priority: {
                    bsonType: "string",
                    description: "priority must be a string and is required"
                },
                description: {
                    bsonType: "string",
                    description: "description must be a string and is required"
                },
                assignee: {
                    bsonType: "string",
                    description: "assignee must be a string and is required"
                },
                createdBy: {
                    bsonType: "string",
                    description: "createdBy must be a string and is required"
                },
                startDate: {
                    bsonType: "date",
                    description: "startDate must be a date and is required",
                },
                endDate: {
                    bsonType: "date",
                    description: "endDate must be a date and is required",
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