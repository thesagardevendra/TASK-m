const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'taskmanagement';

async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (error) {
        console.log('Error while Connecting to MongoDB', error);
        throw error;
    }
}

async function closeMongoDBConnection() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.close();
        console.log('Disconnected to MongoDB');
    } catch (error) {
        console.log('Error while Closing MongoDB connection', error);
        throw error;
    }
}

module.exports = { connectToMongoDB, closeMongoDBConnection };