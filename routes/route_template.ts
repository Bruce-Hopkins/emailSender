import * as express from 'express';
const router = express.Router();
import * as middlewareEmail from "../middleware/middleware_email"

// Template /GET 
router.get("/email/", middlewareEmail.getEmail);

router.get("/email/:id", middlewareEmail.getOneEmail);

// Template /POST
router.post("/email", middlewareEmail.postEmail);

// Template /DELETE
router.delete("/email/:id", middlewareEmail.deleteEmail);

// Template /UPDATE
router.put("/email/:id", middlewareEmail.updateEmail);

module.exports = router;
