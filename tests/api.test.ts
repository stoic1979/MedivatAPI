//------------------------------------------------------------------------------
//
//    Script for testing REST APIs with mock-ed/dummy/test data
//
//------------------------------------------------------------------------------

const EventEmitter = require('events');

const request = require('request');

import {testUser1} from './mock.data.ts';


class ApiTest extends EventEmitter {

	const BASE_URL = 'http://localhost:3000/';

	constructor() {
		console.log("[ApiTest] created...");

		//----------------------
		// async event handlers
		//----------------------
		this.on('signupFailure', this.signupFailure);
		this.on('signupSuccess', this.signupSuccess);
	}

	//-----------------------------------
	// we start with signing up a user,
	// then testing login for that user
	//-----------------------------------
	authTest() {
		console.log("[ApiTest] authTest()...");
		this.signupUser();
	}

	signupUser() {
		console.log("[ApiTest] signupUser()...");

		const url = this.BASE_URL + 'api/auth/signup';

		// keep a reference of this, 
		// as this will refer to reuqest in its scope
		var ref = this;

		request.post({url: url, form: testUser1}, function (error, response, body) {

			if(error) {
				ref.emit('signupFailure', error);
				return;
			}

			// signup successful
  			if(response && response.statusCode == 200) {
  				var content = JSON.parse(body);
				console.log("[ApiTest] signup [OK]");
				ref.emit('signupSuccess', {});
				return;
  			}

  			// signup failed
  			ref.emit('signupFailure', body);
		});
	}

	signupFailure(err) {
		console.log("[ApiTest] :: user signup [FAILED] :: " + err);
	}

	signupSuccess(user) {
		console.log("[ApiTest] :: user signup [OK]");
		this.loginUser(user);
	}

	loginUser(user) {
		console.log("[ApiTest] loginUser()...");

		const url = this.BASE_URL + 'api/auth/login';

		request.post({url: url, form: testUser1}, function (error, response, body) {
			if(error) {
				console.log("[ApiTest] loginUser() - got error: " + error);
				return;
			}

			// login successful
  			if(response && response.statusCode == 200) {
  				var content = JSON.parse(body);
				console.log("[ApiTest] login [OK]");
				console.log("[ApiTest] body: " + body);
				console.log("[ApiTest] token: " + content.token);
				console.log("[ApiTest] userID: " + content.userID);
				return;
  			}

  			// login failed
  			console.log("[ApiTest] login failed :: " + body);
		});
	}

}//ApiTest

//-----------------------------------------------------------------
// start API tests from here
//-----------------------------------------------------------------
let main = () => {
	var at = new ApiTest();
	at.authTest();
}

//---------------------
// script starts here 
//---------------------
main();