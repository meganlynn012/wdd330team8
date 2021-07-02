import Auth from './auth.js';
import makeRequest from './authHelpers.js';


// makeRequest('login', 'POST', {
//     password: 'user1',
//     email: 'user1@email.com'
// });

const auth = new Auth();
document.querySelector(".submit").addEventListener('click', (data) => {
    data.preventDefault();
    auth.login(data);
});