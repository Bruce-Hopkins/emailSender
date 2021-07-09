var express = require('express');
var router = express.Router();
var middlewareTemplate = require('../middleware/middleware_template')

// Template /GET 
router.get("/template/", middlewareTemplate.getTemplate);

router.get("/template/:id", middlewareTemplate.getOneTemplate);

// Template /POST
router.post("/template", middlewareTemplate.postTemplate);

// Template /DELETE
router.delete("/template/:id", middlewareTemplate.deleteTemplate);

// Template /UPDATE
router.put("/template/:id", middlewareTemplate.updateTemplate);

module.exports = router;

