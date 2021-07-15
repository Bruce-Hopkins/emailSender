import {DB} from '../database/template_model'
import * as express from 'express';
import {EmailDocument} from '../index'
import { Mongoose } from 'mongoose';

/**
 * /GET a all EmailDocument
 * @response sends a single email
 */
export function getEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
    DB.find()
    .exec(function (err:any, results:EmailDocument) {
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


/**
 * /GET a specific email
 * @response sends a single email
 */
export function getOneEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
    DB.findById(req.params.id)
    .exec(function (err:any, results:EmailDocument) {
        if (err) return next(err);
        if (results) res.json(results)
        else {
            res.status(404).json({message: "Post not found"})
            res.status(404)
        }
    }); 

}

/**
 * /POST a specific email
 * @response sends 201, the submitted email
 * @body email{string} message{string}
 */
export function postEmail (req: express.Request, res: express.Response, next: express.NextFunction) {
    const email:EmailDocument = new DB (
        {
            email: req.body.email,
            message: req.body.message,
            createdDate: new Date()
        }
    )
    email.save(function (err:any) {
        if (err) { return next(err); }
        res.status(201).send(email);
    });
}

/**
 * /UPDATE a specific email
 * @response sends 201, the updated email
 * @body email{string} message{string}
 */
export function updateEmail (req: express.Request, res: express.Response, next: express.NextFunction) {
    const email:EmailDocument = new DB (
        {
            email: req.body.email,
            message: req.body.message,
            createdDate: new Date(), 
            _id: req.params.id
        }
    )
    DB.findByIdAndUpdate(req.params.id, email, {}, function (err:any, updatedEmail:EmailDocument) {
        if (err) { return next(err); }
        res.status(201).send(email);
    })
}

/**
 * /DELETE a specific email
 * @response sends a 200
 * @body email{string} message{string}
 */
export function deleteEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
    DB.findById(req.params.id)
    .exec(function (err:any, results:EmailDocument) {
        if(err) { return next(err); }
        if (results) {
            DB.findByIdAndDelete(req.params.id, function(err:any) {
                res.status(200).send("template deleted")
            })
        }
    }); 

}