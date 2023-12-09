// config.js
export const CONNECTOR = {
  host: 'localhost',
  port: process.env.NODE_ENV !== 'production'?49155:6379,
};

export const DEFAULT_REMOVE_CONFIG = { removeOnComplete: true, removeOnFail: true };