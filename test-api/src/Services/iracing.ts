import { Request, Response } from 'express';
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { EMAIL, PASSWORD } from '../config.ts';

// #region Cookies
var _cookie: string[] = [];
async function getCookie():Promise<string>{
    if(_cookie.length < 1){
        _cookie = await fetchCookie(hashPassword(PASSWORD, EMAIL.toLowerCase()));
    }
    return _cookie.join('; ');
}

async function fetchCookie(password: string): Promise<string[]> {
    try {
        const response = await axios.post('https://members-ng.iracing.com/auth', {email: EMAIL, password: password}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.headers['set-cookie']) {
            return response.headers['set-cookie'];
        }
        return [];
    } catch (error) {
        return [];
    }
}

const hashPassword = (password: string, username: string): string => {
    return CryptoJS.enc.Base64.stringify(
        CryptoJS.SHA256(password + username.toLowerCase())
    );
};

// #endregion
// #region API

export async function handleGetData(req: Request, res: Response) {
    axios.get('https://members-ng.iracing.com/data/results/get?subsession_id=38280997', {
        headers: {
            'Cookie': await getCookie()
        }
    })
    .then(resultResponse => {
        if (resultResponse.data.link) {
            console.log('Link:', resultResponse.data.link);
            res.json({ message: 'worked'});
        }
    })
    .catch(error => {
        res.json({ error: error });
    });
}