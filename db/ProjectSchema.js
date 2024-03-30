db.createCollection("project", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: ['projectName', 'projectTemplate', 'projectKey', 'reporterEmail',"reporterName","createdAt", "modifiedAt"],
          properties: {
             projectName: {
                bsonType: "string",
                description: "projectName must be a string and is required"
             },
             projectTemplate: {
                bsonType: "string",
                description: "projectTemplate must be a string and is required",
             },
             projectKey: {
                bsonType: "string",
                description: "projectKey must be a string and is required",
             },
             reporterEmail: {
                bsonType: "string",
                pattern:'^[a-zA-Z0-9._%+-]+@gmail\.com$',
                description: "reporterEmail must be a string and is required",
             },
             reporterName: {
                bsonType: "string",
                description: "reporterName must be a string and is required",
             },
             favourite: {
                bsonType: "string",
                description: "favourite must be a string",
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