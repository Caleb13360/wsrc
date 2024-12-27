import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

export class Auth {
    authClient;
    secret = '90182749wcuehgeuikcbsi7uagefd34e798qh98q32heo12bfsrkfug823b';
    constructor() {
            this.authClient = new OAuth2Client();
        };

    async verifyIdToken(token: string): Promise<string> {
        const ticket = await  this.authClient.verifyIdToken({
            idToken: token,
            audience: '18247517896-34lvatidm7uj9orvsf4cc7cffhp2ujhc.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        if (!payload) {
            throw new Error('Payload is undefined');
        }
        const userid = payload['sub'];
        return this.generateToken(userid);
    }

    generateToken(userId: any): string {
        const tokenPayload = {id: userId};
        const token = jwt.sign(tokenPayload, this.secret, {expiresIn: '7d', algorithm: 'HS512'});
        return token;
    }

    decodeToken(token: string): any {
        try {
            const decoded = jwt.verify(token, this.secret);
            return decoded;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }
}

