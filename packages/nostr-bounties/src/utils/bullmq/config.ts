// config.js

export const CONNECTOR = {
  host: "localhost",
  port: process.env.NODE_ENV !== "production" ? process.env.REDIS_PORT : 6379,
  username: "default",
  password: "redispw",
};

export const DEFAULT_REMOVE_CONFIG = {
  removeOnComplete: true,
  removeOnFail: true,
};
