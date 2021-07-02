//Auth class which provides basic JWT based authentication for our app.
// Requires: access to the makeRequest  functions
import makeRequest from './authHelpers.js';
export default class Auth {
    constructor() {
        this.jwtToken = '';
        this.user = {};
    }

    async login(callback) {
            // replace the ids below with whatever you used in your form.
            const password = document.getElementById('password');
            const username = document.getElementById('username');
            const postData = {
                email: username.value,
                password: password.value
            };
            console.log("Username: " + username.value);
            console.log("Pass: " + password.value);
            try {
                // 1. use the makeRequest function to pass our credentials to the server

                // makeRequest('login', 'POST', {
                //     password: 'user1',
                //     email: 'user1@email.com'
                // });
                const response = await makeRequest('login', 'POST', postData);
                // 2. if we get a successful response...we have a token!  Store it since we will need to send it with every request to the API.
                if (response.accessToken) {
                    console.log("Token:" + this.jwtToken);
                    this.jwtToken = response.accessToken;
                }
                // let's get the user details as well and store them locally in the class
                // you can pass a query to the API by appending it on the end of the url like this: 'users?email=' + email
                this.user = await this.getCurrentUser(username.value);

                this.user[0].posts = await this.getPosts(username.value);
                // hide the login form.
                document.querySelector('.loginForm').classList.add('hidden');
                // clear the password
                password.value = '';
                if (this.user) {
                    const userDataSection = document.querySelector('.resultUserData');
                    const userPostSection = document.querySelector('.posts');
                    let userUl = document.createElement('ul');
                    let postUl = document.createElement('ul');
                    let resultingUser = "";
                    this.user.forEach((user) => {
                        for (let key in user) {
                            if (key != "posts") {
                                let li = document.createElement('li');
                                li.innerHTML = key + ": " + user[key];
                                userUl.appendChild(li);
                            } else {
                                for (let posts in user[key]) {
                                    for (let post in user[key][posts]) {
                                        let li = document.createElement('li');
                                        li.innerHTML = post + ": " + user[key][posts][post];
                                        postUl.appendChild(li);
                                    }
                                }
                            }
                        }
                    });
                    userDataSection.appendChild(userUl);
                    userPostSection.appendChild(postUl);
                }
                // since we have a token let's go grab some data from the API by executing the callback if one was passed in
                if (callback) {
                    // callback();
                }
            } catch (error) {
                // if there were any errors display them
                console.log(error);
            }
        }
        // uses the email of the currently logged in user to pull up the full user details for that user from the database
    async getCurrentUser(email) {
        try {
            const data = await makeRequest(
                'users?email=' + email,
                'GET',
                null,
                this.jwtToken
            );
            return data;
            // 3. add the code here to make a request for the user identified by email...don't forget to send the token!
        } catch (error) {
            // if there were any errors display them
            console.log(error);
        }
    }

    async getPosts(email) {
        try {
            const posts = await makeRequest(
                'posts?email=' + email,
                'GET',
                null,
                this.jwtToken
            );
            return posts;
        } catch (error) {
            console.log(error);
        }
    }

    set token(value) {
        // we need this for the getter to work...but we don't want to allow setting the token through this.
    }
    get token() {
        return this.jwtToken;
    }
} // end auth class