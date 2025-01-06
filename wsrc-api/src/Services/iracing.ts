import { Request, Response } from 'express';
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { IRACING_EMAIL, IRACING_PASSWORD } from '../config.js';

// #region Cookies
var _cookie: string[] = [];
async function getCookie():Promise<string>{
    if(_cookie.length < 1){
        _cookie = await fetchCookie(hashPassword(IRACING_PASSWORD, IRACING_EMAIL.toLowerCase()));
    }
    return _cookie.join('; ');
}

async function fetchCookie(password: string): Promise<string[]> {
    try {
        const response = await axios.post('https://members-ng.iracing.com/auth', {email: IRACING_EMAIL, password: password}, {
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
        if (response.data.data.chunk_info.base_download_url) {
            const linkResponse = await axios.get(response.data.data.chunk_info.base_download_url+response.data.data.chunk_info.chunk_file_names[0]);
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
    getRecentlyHosted = async () => await iracingRequest(`https://members-ng.iracing.com/data/results/search_hosted?host_cust_id=1014543&start_range_begin=${new Date(Date.now() - 24 * 60 * 60 * 1000*20).toISOString()}&finish_range_begin=${new Date(Date.now() - 24 * 60 * 60 * 1000*20).toISOString()}`);
    getSessionResults = async (subsession_id: number) => await iracingRequest(`https://members-ng.iracing.com/data/results/get?subsession_id=${subsession_id}`);
    // get race results
    // get racer details
    // get track/car?
    // get request limit
} 

// #endregion