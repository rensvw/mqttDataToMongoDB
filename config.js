var config = {};

config.debug = process.env.DEBUG || false;

config.mqtt = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || 'legoHouseWoonkamerOutput';
config.mqtt.hostname = process.env.MQTT_HOSTNAME || '94.211.191.154';
config.mqtt.port = process.env.MQTT_PORT || 1883;

config.mongodb = {};
config.mongodb.hostname = process.env.MONGODB_HOSTNAME || 'admin:xENWIbiNIMBZ0xi@ds119548.mlab.com';
config.mongodb.port = process.env.MONGODB_PORT || 19548;
config.mongodb.database = process.env.MONGODB_DATABASE || 'legohouse';
config.mongodb.collection = process.env.MONGODB_COLLECTION || 'livingrooms';

module.exports = config;