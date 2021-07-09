var DB = require('../database/template_model')
import * as express from 'express';
import {Email} from '../index'

// Template /GET all templates
/** 
    GET templates from database. 

    Sends several
*/
exports.getTemplate = function(req: express.Request, res: express.Response, next: express.NextFunction) {
    DB.find()
    .exec(function (err:any, results:Email) {
        if (err) {
            console.error(err)
            return next(err);
        }
        if (results) res.status(200).send(results)
        else {
            res.status(404).send("Post not found")
        }
    })
};

// GET a specific template
exports.getOneTemplate = function(req: express.Request, res: express.Response, next: express.NextFunction) {
    DB.findById(req.params.id)
    .exec(function (err:any, results:Email) {
        if (err) return next(err);
        if (results) res.json(results)
        else {
            res.status(404).json({message: "Post not found"})
            res.status(404)
        }
    }); 

}

// Template /POST
exports.postTemplate = function(req: express.Request, res: express.Response, next: express.NextFunction) {

}

// Template /UPDATE
exports.updateTemplate = function(req: express.Request, res: express.Response, next: express.NextFunction) {
}

// Template /DELETE
exports.deleteTemplate = function(req: express.Request, res: express.Response, next: express.NextFunction) {
    DB.findById(req.params.id)
    .exec(function (err:any, results:Email) {
        if(err) { return next(err); }
        if (results) {
            DB.findByIdAndDelete(req.params.id, function(err:any) {
                res.status(200).send("template deleted")
            })
        }
    }); 

}