import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import config from '../config/config';

import User from '../models/user.model';
import BaseController from './baseController';
export default class UsersController extends BaseController {

    model = User;
    SALT_WORK_FACTOR = 10;


    get = (req, res) => {

        console.log("[UsersController] :: get () ......");

        this.model.findOne({ _id: req.params.id }, (err, obj) => {
            if (err) { return console.error(err); }
            res.json({
                'success1': true,
                'data1': obj
            });
        });
    }


    // Get by username
    getUser = (req, callback) => {
        this.model.findOne({ email: req.body.email }, callback).select('+password');
    }

    getUserByToken = (req, res) => {
        this.model.findOne({ _id: req.userId }, (err, obj) => {
            if (err) {
                res.status(500).json({
                    'success': false,
                    'message': 'Not found user'
                });
                return console.error(err);
            }
            res.json({
                'success': true,
                'data': obj
            });
        });
    }

    updateUserByToken = (req, res) => {
        this.model.findOneAndUpdate({ _id: req.userId }, req.body, (err) => {
            if (err) {
                res.status(500).json({
                    'success': false,
                    'message': 'Not found user'
                });
                return console.error(err);
            }
            res.status(200).json({
                'success': true,
                'userID': req.userId
            });
        });
    }

    resetPassword = (req, res) => {
        // generate a salt
        bcrypt.genSalt(this.SALT_WORK_FACTOR, (err, salt) => {
            if (err) {
                res.status(500).json({
                    'success': false,
                    'message': 'Encrypt generate error'
                });
                return console.error(err);
            }

            // hash the password using our new salt
            bcrypt.hash(req.body.password, salt, (err1, hash) => {
                if (err1) {
                    res.status(500).json({
                        'success': false,
                        'message': 'Password encrypt error'
                    });
                    return console.error(err1);
                }

                // override the cleartext password with the hashed one
                req.body.password = hash;
                console.log('++++', req);
                this.updateUserByToken(req, res);
            });
        });
    }

    addUser = (req, res) => {
        const obj = new this.model(req.body);
        obj.save((err, item) => {
            if (err) {
                res.status(400).json({
                    'success': false,
                    'code': err.code,
                    'error': err.errmsg
                });
                return console.error(err);
            }

            const payload = {
                id: item._id
            };

            const token = jwt.sign(payload, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({
                'success': true,
                'token': token,
                'userID': item._id
            });
        });
    }

    setGeneralInformation = (req, res) => {
        const obj = new this.model(req.body);
        obj.save((err, item) => {
            if (err) {
                res.status(400).json({
                    'success': false,
                    'code': err.code,
                    'error': err.errmsg
                });
                return console.error(err);
            }

            const payload = {
                id: item._id
            };

            const token = jwt.sign(payload, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({
                'success': true,
                'token': token,
                'userID': item._id
            });
        });
    }
}
