//@ts-check
const { RateLimiterMongo } = require("rate-limiter-flexible");
const {connection} = require("mongoose");

const rateLimiterMongo = new RateLimiterMongo({
  storeClient: connection,
  points: 10, // Number of points
  duration: 1, // Per second(s)
});

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiterMongo
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
};

module.exports = rateLimiterMiddleware;
