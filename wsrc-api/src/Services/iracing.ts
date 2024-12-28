import { Request, Response } from 'express';
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { EMAIL, PASSWORD } from '../config.js';

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

async function iracingRequest(url: string): Promise<any> {
    try {
        const response = await axios.get(url, {
            headers: {
                'Cookie': await getCookie()
            }
        });
        if (response.data.link) {
            const linkResponse = await axios.get(response.data.link);
            return linkResponse.data;
        }
        return response.data;
    } catch (error) {
        throw error;
    }
}
// #endregion

// #region API
export class IRacingService{
    memberProfile = async (cust_id: number) => await iracingRequest(`https://members-ng.iracing.com/data/member/profile?cust_id=${cust_id}`);
    memberAwards = async (cust_id: number) => await iracingRequest(`https://members-ng.iracing.com/data/member/awards?cust_id=${cust_id}`);
    memberChartData = async (cust_id: number, category_id: number, chart_type: number) => await iracingRequest(`https://members-ng.iracing.com/data/member/chart_data?cust_id=${cust_id}&category_id=${category_id}&chart_type=${chart_type}`);
    //memberInfo = async () => await iracingRequest('https://members-ng.iracing.com/data/member/info');
    //memberParticipationCredits = async () => await iracingRequest('https://members-ng.iracing.com/data/member/participation_credits');
    memberData = async (cust_ids: number[], include_licenses: boolean = false) => await iracingRequest(`https://members-ng.iracing.com/data/member/get?cust_ids=${cust_ids.join(',')}&include_licenses=${include_licenses}`);
    
    lookupDriver = async (searchTerm: string) => await iracingRequest(`https://members-ng.iracing.com/data/lookup/drivers?search_term=${searchTerm}`);
    // get race results
    // get racer details
    // get track/car?
    // get request limit
} 

// #endregion