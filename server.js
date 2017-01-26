/**
 *
 * This NodeJS application listens to MQTT messages and records them to MongoDB
 *
 * @author  Dennis de Greef <github@link0.net>
 * @license MIT
 *
 */
const mongodb = require('mongodb');
const mqtt = require('mqtt');
const config = require('./config');

const mqttUri = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
const client = mqtt.connect(mqttUri);

client.on('connect', function() {
    client.subscribe(config.mqtt.namespace);
});

const mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port + '/' + config.mongodb.database;
mongodb.MongoClient.connect(mongoUri, function(error, database) {
    if (error != null) {
        throw error;
    }
    var collection = database.collection(config.mongodb.collection);
    collection.createIndex({ "topic": 1 });

    client.on('message', function(topic, message) {
        let fixedMessage = JSON.parse(message.toString().replace(/\'/g, '\"'));
        let messageObject = {
            lamp: fixedMessage.lamp,
            heating: fixedMessage.heating,
            movingSensor: fixedMessage.movingSensor,
            doorSensor: fixedMessage.doorSensor,
            windowSensor: fixedMessage.windowSensor,
            tempSensor: fixedMessage.tempSensor,
            lightSensor: fixedMessage.lightSensor,
            createdAt: Date.now()
        };
        collection.insert(messageObject, function(error, result) {
            if (error != null) {
                console.log("ERROR: " + error);
            }
        });
    });
});