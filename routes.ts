
import UsersController from './controllers/usersController';
import AuthController from './controllers/authController';
import CompanyController from './controllers/companyController';
import LeaderboardController from './controllers/leaderboardController';
import ImageController from './controllers/imageController';
import * as verifyToken from './controllers/verifyToken';

export default function setRoutes (app) {

    const usersCtrl = new UsersController();
    const authCtrl = new AuthController();
    const companyCtrl = new CompanyController();
    const leaderboardCtrl = new LeaderboardController();
    const imageCtrl = new ImageController();

    /*** Auth APIs ***/
    app.route('/api/auth/login').post(authCtrl.login);
    app.route('/api/auth/signup').post(authCtrl.signup);
    app.route('/api/auth/forgot-password').post(authCtrl.resetPassword);

    /*** User APIs ***/
    app.route('/api/users').get(verifyToken, usersCtrl.getAll); // get all users
    app.route('/api/user/:id').get(verifyToken, usersCtrl.get); // get user by id
    app.route('/api/user/:id').put(verifyToken, usersCtrl.update); // update user by id
    app.route('/api/user').post(verifyToken, usersCtrl.insert); // save user
    app.route('/api/user/:id').delete(verifyToken, usersCtrl.delete); // delete user by id

    // profile APIs
    app.route('/api/user/general').post(verifyToken, usersCtrl.setGeneralInformation); 

    app.route('/api/user').get(verifyToken, usersCtrl.getUserByToken); // get user by token
    app.route('/api/user').put(verifyToken, usersCtrl.updateUserByToken); // update user by token
    app.route('/api/reset-password').post(verifyToken, usersCtrl.resetPassword); // update password by token

    
}
