
import UsersController from './controllers/usersController';
import PetController from './controllers/petController';
import VaccinationController from './controllers/vaccinationController';
import DrugController from './controllers/drugController';
import AuthController from './controllers/authController';
import CompanyController from './controllers/companyController';
import LeaderboardController from './controllers/leaderboardController';
import ImageController from './controllers/imageController';
import * as verifyToken from './controllers/verifyToken';

export default function setRoutes (app) {

    const usersCtrl = new UsersController();
    const authCtrl = new AuthController();
    const petCtrl = new PetController();
    const vaccinationCtrl = new VaccinationController();
    const drugCtrl = new DrugController();

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

    app.route('/api/user').get(verifyToken, usersCtrl.getUserByToken); // get user by token
    app.route('/api/user').put(verifyToken, usersCtrl.updateUserByToken); // update user by token
    app.route('/api/reset-password').post(verifyToken, usersCtrl.resetPassword); // update password by token

    /*** Pet APIs ***/
    app.route('/api/pet').get(verifyToken, petCtrl.getAll); // get all users
    app.route('/api/pet/:id').get(verifyToken, petCtrl.get); // get user by id
    app.route('/api/pet/:id').put(verifyToken, petCtrl.update); // update user by id
    app.route('/api/pet').post(verifyToken, petCtrl.insert); // add user
    app.route('/api/pet/:id').delete(verifyToken, petCtrl.delete); // delete user by id

    /*** Vaccination APIs ***/
    app.route('/api/vaccination').get(verifyToken, vaccinationCtrl.getAll); // get all users
    app.route('/api/vaccination/:id').get(verifyToken, vaccinationCtrl.get); // get user by id
    app.route('/api/vaccination/:id').put(verifyToken, vaccinationCtrl.update); // update user by id
    app.route('/api/vaccination').post(verifyToken, vaccinationCtrl.insert); // add user
    app.route('/api/vaccination/:id').delete(verifyToken, vaccinationCtrl.delete); // delete user by id

    /*** Drug APIs ***/
    app.route('/api/drug').get(verifyToken, drugCtrl.getAll); // get all users
    app.route('/api/drug/:id').get(verifyToken, drugCtrl.get); // get user by id
    app.route('/api/drug/:id').put(verifyToken, drugCtrl.update); // update user by id
    app.route('/api/drug').post(verifyToken, drugController.insert); // add user
    app.route('/api/drug/:id').delete(verifyToken, drugController.delete); // delete user by id

    
}
