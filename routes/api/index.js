import { Router } from 'express';
const router = Router();

import comicRouter from "./comic/index.js";

router.use("/comic", comicRouter);

router.get('/', (req, res, next) => {
  res.send({ status: "success", timestamp: Date.now() });
});

export default router;
