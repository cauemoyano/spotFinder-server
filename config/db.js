const {
  MONGO_USERNAME = "admin",
  MONGO_PASSWORD = "secret",
  MONGO_DATABASE = "spotfinder",
  MONGO_HOST = "localhost",
  MONGO_PORT = 27017,
} = process.env;

export const MONGO_URI = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(
  MONGO_PASSWORD
)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

export const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
