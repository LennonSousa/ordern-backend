require('dotenv/config');
import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const ivKey = crypto.randomBytes(16);

export function encrypt(text: string, iv: string) {
    if (process.env.JWT_SECRET) {
        const cipher = crypto.createCipheriv(algorithm, process.env.JWT_SECRET, ivKey);

        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return encrypted.toString('hex');
    }

    return text;
};

export function decrypt(hash: string, iv: string) {
    if (process.env.JWT_SECRET) {
        const decipher = crypto.createDecipheriv(algorithm, process.env.JWT_SECRET, ivKey);

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

        return decrpyted.toString();
    }

    return hash;
};