import { Router } from 'express';
const router = Router();

// Import comic routes
import comicRouter from "./comic/index.js";

// Create "/api/comic" endpoint
router.use("/comic", comicRouter);

// "/api" route to check api status
router.get('/', (req, res, next) => {
  res.send({ status: "success", timestamp: Date.now() });
});

export default router;
