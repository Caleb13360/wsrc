import { Request, Response } from 'express';
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { EMAIL, PASSWORD } from '../config.js';
import { error } from 'console';

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

// #region iracing Request

async function iracingRequest(url:string):Promise<any>{
    return await axios.get(url, {
        headers: {
            'Cookie': await getCookie()
        }
    }).then(resultReponse => {
        if(resultReponse.data.link){
            return resultReponse.data.link
        }
        return '';
    }).catch(error => {return error})

}
// #endregion

// #region API
export function handleGetData(req: Request, res: Response) {
    const dataLink = iracingRequest('https://members-ng.iracing.com/data/results/get?subsession_id=38280997')
    res.json({'Link': dataLink})
}
// #endregion