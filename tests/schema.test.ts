//------------------------------------------------------------------------------
//
//    Script for testing db schema
//
//    Note - would be good to use a different/test db instead of production 
//
//------------------------------------------------------------------------------

import * as mongoose from 'mongoose';

import config from '../config/config';

import User from '../models/user.model';
import Pet from '../models/pet.model';
import Drug from '../models/drug.model';
import Vaccination from '../Vaccination/user.model';


import {testUser1, testPet, testVaccination, testDrug} from './mock.data.ts';
 
const EventEmitter = require('events');

class SchemaTest extends EventEmitter {

	constructor() {
		console.log("[SchemaTest] created...");

		//----------------------
		// async event handlers
		//----------------------
		this.on('userCreationFailure', this.userCreationFailure);
		this.on('userCreationSuccess', this.userCreationSuccess);

		this.on('petCreationFailure', this.petCreationFailure);
		this.on('petCreationSuccess', this.petCreationSuccess);

		
	}

	addUser() {
		console.log("[SchemaTest] :: addUser() - adding user: \n" + JSON.stringify(testUser1));

		var user = new User(testUser1);
        user.save((err, item) => {
            if (err) {
                this.emit('userCreationFailure', err); 
                return;
            }
            
            this.emit('userCreationSuccess', item);
        });
	}

	userCreationFailure(err) {
		console.error("[SchemaTest] :: userCreationFailure() - failed to create user with error:\n " + err);
	}

	userCreationSuccess(user) {
		console.error("[SchemaTest] :: userCreationSuccess() successfully added user:\n " + JSON.stringify(user));
		this.addPet();
	}

	addPet() {
		console.log("[SchemaTest] :: addPet() - adding pet: \n" + JSON.stringify(testPet));

		var pet = new Pet(testPet);
        pet.save((err, item) => {
            if (err) {
                this.emit('petCreationFailure', err); 
                return;
            }
            
            this.emit('petCreationSuccess', item);
        });
	}

	petCreationFailure(err) {
		console.error("[SchemaTest] :: petCreationFailure() - failed to create pet with error:\n " + err);
	}

	petCreationSuccess(pet) {
		console.error("[SchemaTest] :: petCreationSuccess() successfully added pet:\n " + JSON.stringify(pet));
		
	}
}//SchemaTest

//-----------------------------
// start running schema tests
//-----------------------------
let runTests = () => {
	console.log('[SchemaTest] :: Running schema tests...');

	var st = new SchemaTest();
	st.addUser();

}

//-----------------------------------------------------------------
// connect to db, then run tests
//-----------------------------------------------------------------
let main = () => {
	mongoose.connect(config.db, { useMongoClient: true });
	const db = mongoose.connection;
	(mongoose as any).Promise = global.Promise;

	db.on('error', console.error.bind(console, '[SchemaTest] :: connection error:'));

	db.once('open', () => {
	    console.log('[SchemaTest] :: Connected to MongoDB');
	    runTests();
	});
}

//---------------------
// script starts here 
//---------------------
main();