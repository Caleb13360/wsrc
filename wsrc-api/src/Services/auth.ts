import { OAuth2Client } from 'google-auth-library';
import { JWT_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export class Auth {
    authClient;
    constructor() {
            this.authClient = new OAuth2Client();
        };

        async verifyIdToken(token: string): Promise<{ userid: string; email: string }> {
            const ticket = await this.authClient.verifyIdToken({
                idToken: token,
                audience: '18247517896-34lvatidm7uj9orvsf4cc7cffhp2ujhc.apps.googleusercontent.com',
            });
            const payload = ticket.getPayload();
            if (!payload) {
                throw new Error('Payload is undefined');
            }
            const userid = payload['sub'];
            const email = payload['email'] !== undefined ? payload['email'] : '';
            return { userid, email };
        }

    generateToken(userId: any): string {
        const tokenPayload = {id: userId};
        const token = jwt.sign(tokenPayload, JWT_SECRET, {expiresIn: '7d', algorithm: 'HS512'});
        return token;
    }

    decodeToken(token: string): any {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            return null;
        }
    }
}

