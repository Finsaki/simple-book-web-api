/**
 * With this file info, error and debug messages can be separeted and used instead of console.log
 */

const info = (...params) => {
  console.info("[INFO]", ...params);
};

const error = (...params) => {
  console.error("[ERROR]", ...params);
};

const debug = (...params) => {
  if (process.env.NODE_ENV === "test") {
    console.debug("[DEBUG]", ...params);
  }
};

module.exports = { info, error, debug };
