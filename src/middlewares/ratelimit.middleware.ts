// middleware/rateLimit.js
import rateLimit from "express-rate-limit";

// Tạo middleware limit
export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
