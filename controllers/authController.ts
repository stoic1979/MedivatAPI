import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import config from '../config/config';
import User from '../models/user.model';
import UsersController from './usersController';

export default class AuthController extends UsersController {
    model = User;

    login = (req, res) => {
        this.getUser(req, (err, user) => {
            if (err) { throw err; }
            if (user == null) {
                res.status(400).json({
                    'success': false,
                    'error': 'Not Found User'
                });
            } else {
                user.comparePassword(req.body.password, (error, isMatch) => {
                    if (error) { throw error; }
                    if (isMatch) {

                        const payload = {
                            id: user._id
                        };

                        const token = jwt.sign(payload, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });

                        res.json({
                            'success': true,
                            'token': token,
                            'userID': user._id
                        });
                    } else {
                        res.status(400).json({
                            'success': false,
                            'error': 'Invalid Password'
                        });
                    }
                });
            }
        });
    }

    signup = (req, res) => {
        this.addUser(req, res);
    }

   
}
