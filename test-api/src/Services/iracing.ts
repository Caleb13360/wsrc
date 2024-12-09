import { Request, Response } from 'express';
import CryptoJS from 'crypto-js'
import axios from 'axios'

// #region Auth Utility
const hashPassword = (password: string, username: string): string => {
    return CryptoJS.enc.Base64.stringify(
        CryptoJS.SHA256(password + username.toLowerCase())
    );
};
// #endregion


// Example usage
const email: string = 'x';
const password: string = 'x';
const encodedPassword = hashPassword(password, email.toLowerCase());
var cookie: string[] = [];

const body = {
    email: email,
    password: encodedPassword
};

axios.post('https://members-ng.iracing.com/auth', body, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (response.headers['set-cookie']) {
        cookie = response.headers['set-cookie'];
        console.log('Cookies:', response.headers['set-cookie']);
        
        // Retrieve session result data using the cookies
        axios.get('https://members-ng.iracing.com/data/results/get?subsession_id=38280997', {
            headers: {
                'Cookie': cookie.join('; ')
            }
        })
        .then(resultResponse => {
            console.log('Session Result Data:', resultResponse.data);
            if (resultResponse.data.link) {
                console.log('Link:', resultResponse.data.link);
            }
        })
        .catch(error => {
            console.error('Error retrieving session result data:', error);
        });
    } else {
        console.log('No cookies received');
    }
})
.catch(error => {
    console.error('Error:', error);
});