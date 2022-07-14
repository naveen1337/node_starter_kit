import winston from "winston";
const printf = winston.format.printf;

const myFormat = printf(({ message }) => {
  return message;
});

const logger = winston.createLogger({
  level: "info",
  format: myFormat,
  // defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "info.log", level: "info" }),
  ],
});

export default logger;
