import { Router } from "express";
const router = Router();

// "/api/comic" route to check api status
router.get('/', (req, res, next) => {
    res.send({ status: "success", timestamp: Date.now() });
});

export default router;
